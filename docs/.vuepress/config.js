const getSidebarArr = () => {
    let fs = require('fs');
    let docsPath = __dirname + '/../';
    let sidebarArr = [];
    let HomeFileList = [];
    let docsFileList = fs.readdirSync(docsPath);
    docsFileList.forEach((file) => {
        if (file === ".vuepress") return;
        let stat = fs.lstatSync(docsPath + '/' + file);
        if (stat.isDirectory()) {
            let docsFolderPath = docsPath + '/' + file;
            let list = fs.readdirSync(docsFolderPath);
            sidebarArr.push(makeSidebarObject(file, list));
        } else {
            HomeFileList.push(file);
        }
    });
    sidebarArr.unshift(makeSidebarObject("", HomeFileList));
    return sidebarArr;
};

const makeSidebarObject = (folder, mdFileList) => {
    let path = folder ? '/' + folder + '/' : '/';
    mdFileList = aheadOfReadMe(mdFileList); // [ README.md, ..... ]
    let tmpMdFileList = [];
    mdFileList.forEach((mdFile) => {
        if (mdFile.substr(-3) === './md') {
            mdFile = mdFile.slice(0, -3) === 'README' ? '' : mdFile.slice(0, -3);
            tmpMdFileList.push(path + mdFile);
        }
    });
    mdFileList = tmpMdFileList;
    let title = null;
    if (folder) {
        let dotIdx = folder.indexOf('.');
        title = Number(folder.substr(0, dotIdx)) ? folder.substr(dotIdx + 1) : folder;
    } else {
        title = 'HOME';
    }
    return {
        title: title,
        collapsable: false,
        children: mdFileList
    }
};

const aheadOfReadMe = (fileArr) => {
    let readmeIdx = fileArr.indexOf('README.md');
    if (readmeIdx !== -1) {
        fileArr.unshift(fileArr.splice(readmeIdx, 1)[0]);
    }
    return fileArr;
};

module.exports = {
    title: 'HwangKim_site',
    description: 'Awesome description',
    themeConfig: {
        nav: [
            {text: '나의일기', link: '/about/'},
            {text: '개발일기', link: '/about/'},
            {text: 'Github', link: 'http://github.com/tjddus'}
        ],
        sidebar: getSidebarArr()
    },
    base: '/'
};
