const fs=require('fs');const edit=(p,fn)=>fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')));
const reports=JSON.parse(fs.readFileSync('.lint-results.json','utf8'));for(const f of reports){let s=fs.readFileSync(f.filePath,'utf8');const lines=s.split('\n');for(const m of f.messages.filter(m=>m.ruleId==='@typescript-eslint/no-unused-vars')){const name=m.message.match(/'([^']+)'/)[1];lines[m.line-1]=lines[m.line-1].replace(new RegExp('\\b'+name+',?\\s*'),'');}fs.writeFileSync(f.filePath,lines.join('\n'));}
edit('app/admin/page.tsx',s=>s.replace('[user, isAdmin, token]);','[user, isAdmin, token, t]);'));
edit('app/my-posts/page.tsx',s=>s.replace('[user, token]);','[user, token, t]);'));
edit('app/posts/[id]/edit/page.tsx',s=>s.replace('[params]);','[params, t]);'));
edit('components/PostForm.tsx',s=>s.replace('}, []);','}, [t]);'));
