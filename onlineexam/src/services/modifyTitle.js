{
    let link = document.querySelector("link[rel='icon']")
    if (window.location.href.indexOf('dujiaManage') !== -1) {
        link.href = '/favicon-dj.ico';
        document.title = 'APP配置管理'
    } else {
        link.href = '/favicon.ico';
        document.title = '在线考试管理'
    }
}