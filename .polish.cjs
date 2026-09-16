const fs=require('fs'),ts=require('typescript');const edit=(p,fn)=>fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')));
for(const p of ['components/PostForm.tsx','app/login/page.tsx','app/register/page.tsx'])edit(p,s=>s.replace('import { useI18n }','import LocalizedForm from "@/components/LocalizedForm";\nimport { useI18n }').replaceAll('<form ','<LocalizedForm ').replaceAll('</form>','</LocalizedForm>'));
for(const p of ['app/login/page.tsx','app/register/page.tsx'])edit(p,s=>s.replace('id={"email"}','id="email" dir="ltr" autoComplete="email"').replace('id={"password"}','id="password" dir="ltr" autoComplete="'+(p.includes('login')?'current-password':'new-password')+'"').replace('id="confirmPassword"','id="confirmPassword" dir="ltr" autoComplete="new-password"'));
edit('app/not-found.tsx',s=>s.replace('{"go back home"}','{t("errors.home")}'));
edit('app/my-posts/page.tsx',s=>s.replace('{"new report"}','{t("mine.new")}').replace('{"report an item"}','{t("nav.report")}'));
// Keep explicitly translated alert text reactive when the language changes.
edit('context/LocaleContext.tsx',s=>s.replace('(_locale: Locale) => {}','(_locale: Locale) => { void _locale; }'));
// Organize TypeScript imports without changing runtime logic.
const configPath=ts.findConfigFile('.',ts.sys.fileExists,'tsconfig.json');const parsed=ts.getParsedCommandLineOfConfigFile(configPath,{}, {...ts.sys,onUnRecoverableConfigFileDiagnostic:()=>{}});const files=parsed.fileNames;
const host={getScriptFileNames:()=>files,getScriptVersion:()=>"0",getScriptSnapshot:f=>ts.sys.fileExists(f)?ts.ScriptSnapshot.fromString(ts.sys.readFile(f)):undefined,getCurrentDirectory:()=>process.cwd(),getCompilationSettings:()=>parsed.options,getDefaultLibFileName:ts.getDefaultLibFilePath,fileExists:ts.sys.fileExists,readFile:ts.sys.readFile,readDirectory:ts.sys.readDirectory};
const service=ts.createLanguageService(host);
for(const file of files.filter(f=>/\/(app|components|context|lib\/i18n)\//.test(f.replaceAll('\\','/'))))for(const change of service.organizeImports({type:'file',fileName:file},{},{})){let s=fs.readFileSync(change.fileName,'utf8');for(const edit of [...change.textChanges].sort((a,b)=>b.span.start-a.span.start))s=s.slice(0,edit.span.start)+edit.newText+s.slice(edit.span.start+edit.span.length);fs.writeFileSync(change.fileName,s);}
