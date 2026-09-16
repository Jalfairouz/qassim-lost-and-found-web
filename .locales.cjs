const fs=require('fs');fs.mkdirSync('locales',{recursive:true});fs.mkdirSync('lib/i18n',{recursive:true});
const rows=`
brand.name|Qassim Lost & Found|مفقودات جامعة القصيم
brand.short|Qassim|جامعة القصيم
brand.service|Lost & Found|المفقودات والموجودات
brand.description|Report and find lost items at Qassim University|بلّغ عن المفقودات والموجودات في جامعة القصيم وابحث عن أغراضك
common.skip|Skip to content|انتقل إلى المحتوى
common.search|Search|بحث
common.cancel|Cancel|إلغاء
common.confirm|Confirm|تأكيد
common.close|Close|إغلاق
common.delete|Delete|حذف
common.edit|Edit|تعديل
common.save|Save Changes|حفظ التعديلات
common.retry|Try again|حاول مرة أخرى
common.wait|Please wait...|يرجى الانتظار…
common.show|Show|إظهار
common.hide|Hide|إخفاء
common.loading|Loading reports|جارٍ تحميل البلاغات
common.loadingText|Loading reports…|جارٍ تحميل البلاغات…
nav.overview|Overview|الرئيسية
nav.lost|Lost items|المفقودات
nav.found|Found items|الموجودات
nav.mine|My reports|بلاغاتي
nav.admin|Admin|الإدارة
nav.login|Log in|تسجيل الدخول
nav.logout|Log out|تسجيل الخروج
nav.register|Register|إنشاء حساب
nav.report|Report an item|إضافة بلاغ
nav.main|Main navigation|التنقل الرئيسي
nav.mobile|Mobile navigation|التنقل على الجوال
nav.open|Open navigation|فتح قائمة التنقل
nav.language|Change language|تغيير اللغة
nav.english|English|English
nav.arabic|العربية|العربية
home.eyebrow|Qassim University · Community first|جامعة القصيم · معًا لخدمة مجتمعنا
home.title|Lost something?|فقدت شيئًا؟
home.subtitle|Let’s find it together.|خلّنا نلقاه معًا.
home.description|Connecting our campus, one returned item at a time. Search community reports or help someone find what matters.|نتعاون عشان ترجع الأغراض لأصحابها. ابحث في بلاغات الجامعة أو ساعد أحدًا يلقى ما فقده.
home.browse|Browse found items|تصفّح الموجودات
home.latest|Latest community reports|أحدث بلاغات الجامعة
home.kindness|A small act of kindness can make someone’s day.|مساعدة بسيطة منك قد تسعد غيرك.
home.foundTitle|Found an item on campus?|لقيت غرضًا في الجامعة؟
home.foundDescription|A quick report could be the good news someone is waiting for.|بلاغ بسيط منك قد يكون الخبر اللي ينتظره صاحبه.
home.share|Share a report|أضف بلاغًا
home.footer|Qassim Lost & Found · Helping our university community reconnect.|مفقودات جامعة القصيم · نتعاون لإعادة الأغراض لأصحابها.
stats.total|Total reports|إجمالي البلاغات
stats.shared|Shared by our community|بلاغات من مجتمع الجامعة
stats.lostHelp|Help someone find their item|ساعد أحدًا يلقى غرضه
stats.owners|Looking for their owners|بانتظار أصحابها
stats.colleges|Colleges|الكليات
stats.campus|Connected across campus|معًا في أنحاء الجامعة
browse.community|Community reports|بلاغات الجامعة
browse.lostDescription|A little help can bring something important home.|مساعدتك قد ترجع غرضًا غاليًا لصاحبه.
browse.foundDescription|Found something familiar? Help it find its way back.|تعرّفت على غرض؟ ساعدنا نوصله لصاحبه.
search.prompt|What are you looking for?|وش الغرض اللي تبحث عنه؟
search.placeholder|Search items, descriptions…|ابحث باسم الغرض أو وصفه…
search.location|College / location|الكلية / الموقع
search.allColleges|All colleges|جميع الكليات
search.results|Search results|نتائج البحث
search.allReports|All reports|جميع البلاغات
search.clear|Clear filters|مسح التصفية
search.filters|Report filters|تصفية البلاغات
search.reports|Reports|البلاغات
report.lost|Lost|مفقود
report.found|Found|موجود
report.type|Report type|نوع البلاغ
report.backLost|Back to lost items|العودة إلى المفقودات
report.backFound|Back to found items|العودة إلى الموجودات
report.number|Report #{id}|بلاغ رقم {id}
report.about|About this item|تفاصيل الغرض
report.reported|Reported|تاريخ البلاغ
report.seen|Have you seen this item?|شفت هذا الغرض؟
report.yours|Could this be yours?|هل هذا غرضك؟
report.contact|Contact the person who shared this report to arrange the next step.|تواصل مع صاحب البلاغ لتنسيق استلام الغرض أو إعادته.
report.call|Call|اتصال
report.handover|A thoughtful handover|تسليم آمن
report.handoverDescription|Confirm the item’s identifying details and arrange to meet in a public place on campus.|تأكد من تفاصيل الغرض التي تميّزه، واتفق على اللقاء في مكان عام داخل الجامعة.
form.eyebrow|Community report|بلاغ للجامعة
form.title|Tell us about the item|حدّثنا عن الغرض
form.description|Clear details help the right person recognize it. Fields marked * are required.|التفاصيل الواضحة تساعد صاحب الغرض يتعرّف عليه. الحقول المعلّمة بـ * مطلوبة.
form.lost|I lost an item|فقدت غرضًا
form.found|I found an item|لقيت غرضًا
form.itemTitle|Item Title *|اسم الغرض *
form.titlePlaceholder|e.g., Black leather wallet|مثال: محفظة جلدية سوداء
form.details|Description *|الوصف *
form.detailsPlaceholder|Describe the item, where and when it was lost/found, and any identifying details...|صف الغرض، ومكان ووقت فقدانه أو العثور عليه، وأي علامات تميّزه…
form.college|College/Location *|الكلية / الموقع *
form.collegeLabel|College or location|الكلية أو الموقع
form.selectCollege|Select a college|اختر الكلية
form.phone|Contact Number *|رقم التواصل *
form.phonePlaceholder|05XXXXXXXX|05XXXXXXXX
form.phoneHint|Enter a valid Saudi mobile number (05XXXXXXXX)|أدخل رقم جوال سعودي صحيحًا يبدأ بـ 05 ويتكوّن من 10 أرقام
form.phonePublic|Your phone number will be visible to other users|سيظهر رقم جوالك للمستخدمين الآخرين
form.saving|Saving...|جارٍ الحفظ…
form.create|Create Post|نشر البلاغ
form.newDescription|Help the community by reporting a lost or found item|ساعد مجتمع الجامعة بإضافة بلاغ عن غرض مفقود أو موجود
form.edit|Edit Post|تعديل البلاغ
form.editDescription|Update your item report|عدّل تفاصيل بلاغك
form.counter|{count}/{max}|{count}/{max}
validation.required|Please fill out this field.|يرجى تعبئة هذا الحقل.
validation.email|Please enter a valid email address.|يرجى إدخال بريد إلكتروني صحيح.
validation.minLength|Please use at least {min} characters.|يرجى إدخال {min} أحرف على الأقل.
validation.college|Please select a college.|يرجى اختيار الكلية.
validation.passwordLength|Password must be at least 6 characters|يجب أن تتكوّن كلمة المرور من 6 أحرف على الأقل
validation.passwordMatch|Passwords do not match|كلمتا المرور غير متطابقتين
validation.invalid|Please check this field.|يرجى التحقق من هذا الحقل.
auth.welcome|Welcome back|حيّاك من جديد
auth.loginDescription|Log in to your Qassim Lost & Found account|سجّل الدخول إلى حسابك في مفقودات جامعة القصيم
auth.email|Email|البريد الإلكتروني
auth.emailPlaceholder|name@example.com|name@example.com
auth.password|Password|كلمة المرور
auth.confirmPassword|Confirm Password|تأكيد كلمة المرور
auth.passwordPlaceholder|••••••••|••••••••
auth.loggingIn|Logging in...|جارٍ تسجيل الدخول…
auth.noAccount|Don’t have an account?|ما عندك حساب؟
auth.haveAccount|Already have an account?|عندك حساب؟
auth.create|Create an account|إنشاء حساب
auth.createDescription|Join Qassim Lost & Found to report items|انضم إلى مفقودات جامعة القصيم وشارك بلاغاتك
auth.creating|Creating account...|جارٍ إنشاء الحساب…
mine.description|Manage your lost and found reports|تابع بلاغاتك عن المفقودات والموجودات
mine.new|New Report|بلاغ جديد
mine.empty|No posts yet|ما عندك بلاغات حتى الآن
mine.emptyDescription|Start by reporting your first lost or found item|ابدأ بإضافة بلاغ عن غرض فقدته أو لقيته
empty.title|No items found|ما لقينا نتائج
empty.description|Try adjusting your search criteria or browse other categories|جرّب تعديل البحث أو تصفّح أنواع البلاغات الأخرى
empty.reports|No reports found.|لا توجد بلاغات.
empty.users|No users found.|لا يوجد مستخدمون.
errors.title|Something went wrong|حدث خطأ
errors.generic|Something went wrong.|تعذّر إتمام العملية. حاول مرة أخرى.
errors.page|We couldn’t load this page|تعذّر تحميل الصفحة
errors.retryDescription|Please try again in a moment.|يرجى المحاولة مرة أخرى بعد قليل.
errors.notFound|Page not found|الصفحة غير موجودة
errors.notFoundDescription|This post may have been deleted or the link might be incorrect.|قد يكون البلاغ محذوفًا أو الرابط غير صحيح.
errors.home|Go back home|العودة للرئيسية
errors.colleges|Failed to load colleges.|تعذّر تحميل الكليات.
errors.mine|Failed to load your posts.|تعذّر تحميل بلاغاتك.
errors.admin|Failed to load admin data.|تعذّر تحميل بيانات الإدارة.
errors.delete|Failed to delete post.|تعذّر حذف البلاغ.
errors.login|Login failed. Please try again.|تعذّر تسجيل الدخول. تحقق من بياناتك وحاول مرة أخرى.
errors.register|Registration failed. Please try again.|تعذّر إنشاء الحساب. تحقق من بياناتك وحاول مرة أخرى.
errors.invalidId|Invalid post ID|رقم البلاغ غير صحيح
errors.postNotFound|Post not found|البلاغ غير موجود
errors.unauthorized|Not Authorized|غير مصرّح لك
errors.ownerOnly|You can only edit your own posts|يمكنك تعديل بلاغاتك فقط
errors.update|Update failed.|تعذّر حفظ التعديلات.
errors.session|Please log in again.|يرجى تسجيل الدخول من جديد.
errors.forbidden|You do not have permission for this action.|ليس لديك صلاحية لتنفيذ هذا الإجراء.
errors.validation|Please check the entered information.|يرجى التحقق من البيانات المدخلة.
errors.conflict|This information is already in use.|هذه البيانات مستخدمة بالفعل.
errors.rateLimit|Too many requests. Please try again later.|طلبات كثيرة خلال وقت قصير. حاول مرة أخرى لاحقًا.
dialog.delete|Delete report?|حذف البلاغ؟
dialog.deleteDescription|This report will be permanently deleted. This action cannot be undone.|سيُحذف البلاغ نهائيًا، ولا يمكن التراجع عن هذا الإجراء.
admin.title|Admin dashboard|لوحة الإدارة
admin.name|Administration|الإدارة
admin.community|Community management|إدارة مجتمع الجامعة
admin.users|User accounts|حسابات المستخدمين
admin.reportDescription|Reports across all colleges|البلاغات في جميع الكليات
admin.userDescription|Registered community members|أعضاء مجتمع الجامعة المسجّلون
admin.searchReports|Search reports|البحث في البلاغات
admin.searchUsers|Search users|البحث في المستخدمين
admin.searchPlaceholder|Search…|ابحث…
admin.report|Report|البلاغ
admin.type|Type|النوع
admin.college|College|الكلية
admin.actions|Actions|الإجراءات
admin.userId|User ID|معرّف المستخدم
admin.registeredUsers|Registered users|المستخدمون المسجّلون
admin.deleteLabel|Delete {title}|حذف {title}
sidebar.title|Sidebar|القائمة الجانبية
sidebar.description|Displays the mobile sidebar.|قائمة التنقل الجانبية على الجوال.
sidebar.toggle|Toggle Sidebar|فتح أو إغلاق القائمة الجانبية
colleges.medical|College of Applied Medical Sciences|كلية العلوم الطبية التطبيقية
colleges.business|College of Business and Economics|كلية الأعمال والاقتصاد
colleges.computer|College of Computer|كلية الحاسب
colleges.dentistry|College of Dentistry|كلية طب الأسنان
colleges.engineering|College of Engineering|كلية الهندسة
colleges.medicine|College of Medicine|كلية الطب
colleges.pharmacy|College of Pharmacy|كلية الصيدلة
colleges.science|College of Science|كلية العلوم
colleges.other|Other|أخرى
reports.zero|No reports|لا توجد بلاغات
reports.one|{count} report|بلاغ واحد
reports.two|{count} reports|بلاغان
reports.few|{count} reports|{count} بلاغات
reports.many|{count} reports|{count} بلاغًا
reports.other|{count} reports|{count} بلاغ
`;
const en={},ar={};for(const row of rows.trim().split('\n')){const [k,e,a]=row.split('|');en[k]=e;ar[k]=a;}
fs.writeFileSync('locales/en.ts','const en = '+JSON.stringify(en,null,2)+' as const;\nexport default en;\n');fs.writeFileSync('locales/ar.ts','import type en from "./en";\nconst ar: Record<keyof typeof en, string> = '+JSON.stringify(ar,null,2)+';\nexport default ar;\n');
fs.writeFileSync('.locale-map.json',JSON.stringify(en));
