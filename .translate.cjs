const ts=require('typescript'),fs=require('fs');
const dict=JSON.parse(fs.readFileSync('.locale-map.json','utf8'));const normalize=s=>s.replace(/&apos;/g,"'").replace(/[’]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();const map=new Map(Object.entries(dict).map(([k,v])=>[normalize(v),k]));
for(const [s,k] of Object.entries({'My Posts':'nav.mine','Log In':'nav.login','Login':'nav.login','Logout':'nav.logout','Report item':'nav.report','Report an Item':'nav.report','Delete post?':'dialog.delete','This action cannot be undone. The post will be permanently deleted.':'dialog.deleteDescription',"Don't have an account?":'auth.noAccount'}))map.set(normalize(s),k);
fs.writeFileSync('components/Navbar.tsx','export { default } from "./AppHeader";\n');
// Defaults are translated at render time, after hooks are available.
for(const [p,replacements]of Object.entries({'components/ErrorState.tsx':[['title = "Something went wrong"','title'],['{title}','{title ?? t("errors.title")}']],'components/ConfirmDialog.tsx':[['confirmLabel = "Confirm"','confirmLabel'],['cancelLabel = "Cancel"','cancelLabel'],['{cancelLabel}','{cancelLabel ?? t("common.cancel")}'],[': confirmLabel}',': (confirmLabel ?? t("common.confirm"))}']]})){let s=fs.readFileSync(p,'utf8');for(const [a,b]of replacements)s=s.replace(a,b);fs.writeFileSync(p,s);}
const files=['app','components'].flatMap(d=>fs.readdirSync(d,{recursive:true}).filter(p=>p.endsWith('.tsx')).map(p=>d+'/'+p.replaceAll('\\','/'))).filter(p=>p!=='app/layout.tsx');
for(const p of files){let s=fs.readFileSync(p,'utf8');const sf=ts.createSourceFile(p,s,99,true,4);const changes=[];function walk(n){let text,key;if(ts.isJsxText(n)){text=n.text;key=map.get(normalize(text));if(key)changes.push([n.getStart(sf),n.end,'{t('+JSON.stringify(key)+')}']);}else if(ts.isStringLiteral(n)){text=n.text;key=map.get(normalize(text));if(key&&text!=='Lost'&&text!=='Found'&&!ts.isImportDeclaration(n.parent)&&!(ts.isPropertyAssignment(n.parent)&&n.parent.name.getText(sf)==='type')){const value='t('+JSON.stringify(key)+')';changes.push([n.getStart(sf),n.end,ts.isJsxAttribute(n.parent)?'{'+value+'}':value]);}}ts.forEachChild(n,walk)}walk(sf);
for(const [a,b,text]of changes.sort((a,b)=>b[0]-a[0]))s=s.slice(0,a)+text+s.slice(b);
if(!changes.length&&!s.includes('t("'))continue;
const server=p==='app/page.tsx'||p==='components/BrowseReports.tsx'||p==='app/posts/[id]/page.tsx';
const parsed=ts.createSourceFile(p,s,99,true,4);const inject=[];for(const n of parsed.statements){if(ts.isFunctionDeclaration(n)&&n.body&&/\bt\(/.test(n.body.getText(parsed)))inject.push(n.body.getStart(parsed)+1);}
for(const pos of inject.sort((a,b)=>b-a))s=s.slice(0,pos)+'\n  const { t, locale, dir, number, date, college, reportCount, translateMessage, errorText } = '+(server?'await getI18n()':'useI18n()')+';\n'+s.slice(pos);
s='import { '+(server?'getI18n':'useI18n')+' } from "'+(server?'@/lib/i18n/server':'@/context/LocaleContext')+'";\n'+s;
if(!server){s=s.replace(/"use client";?\s*/,'');s='"use client";\n'+s;}
fs.writeFileSync(p,s);}
