const fs=require('fs');const edit=(p,fn)=>fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')));
edit('components/PostForm.tsx',s=>s.replace('update("type", t)','update("type", itemType)'));
edit('app/admin/page.tsx',s=>s.replace('id=<bdi dir="ltr">{u.id}</bdi>','id={u.id}').replace('renderEmptyState={() => "no users found."}','renderEmptyState={() => t("empty.users")}').replace('renderEmptyState={() => "no reports found."}','renderEmptyState={() => t("empty.reports")}'));
edit('components/FilterBar.tsx',s=>s.replace('const { t }','const { t, reportCount }').replace('query.set(t("common.search"), search)','query.set("search", search)').replace('{count} {count === 1 ? t("admin.report") : t("search.reports")}','{reportCount(count)}'));
