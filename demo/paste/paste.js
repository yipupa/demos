// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
const $wp = document.getElementById('workspace');

const pasteHtml = (html) => {
    // if (typeof html != "string" || html.length <= 0) {
    //     return;
    // }
    console.log(html)
    if (window.getSelection) {
        let fragment = document.createElement("div");
        fragment.innerHTML = html;
        window.getSelection().getRangeAt(0).insertNode(fragment);
    } else {
        document.selection.createRange().pasteHTML(html);
    }
}

const pasteText = (text) => {
    if (typeof text != "string" || text.length <= 0) {
        return;
    }

    text = text.replace(/\r\n/g, "\n"); // windows系统格式换行符需要处理
    text = text.replace(/\r/g, "\n"); // mac系统格式换行符
    console.log(text)
    if (window.getSelection) {
        let textNode = document.createTextNode(text);
        // 在当前的光标处插入文本节点
        let range = window.getSelection().getRangeAt(0);
        // 删除选中文本
        range.deleteContents();
        // 插入文本
        range.insertNode(textNode);
    } else {
        //todo ???
        document.execCommand('insertText', false, text);
    }
}

const pasteImage = (image) => {
    // window.session.postObjectURL().then((uploadUrl) => {
    //     const formData = new FormData()
    //     formData.append("object", data)

    //     this.xhr = new XMLHttpRequest()
    //     this.xhr.open("post", uploadUrl, true)
    //     const imgObj = data;
    //     this.xhr.onload = (e) => {
    //         const {status} = e.target
    //         console.log('上传文件完成，status：', status)
    //         this.xhr = null
    //         if (status === 200) {
    //             const img = new Image()
    //             img.src = window.URL.createObjectURL(imgObj)
    //             img.onload = (e1) => {
    //                 const data = JSON.parse(e.target.response)
    //                 //insertPicture()
    //             }
    //         } else {
    //             //图片粘贴失败
    //         }
    //     }
    //     this.xhr.onerror = (e) => {
    //         console.log('上传文件失败：', e)
    //         this.xhr = null
    //         //图片粘贴失败
    //     }

    //     this.xhr.send(formData)

    // }).catch((e) => {
        
    // })
    let reader = new FileReader();
    reader.onload = (e) => {
        console.log(reader.result);
        let img = new Image();
        img.src = reader.result;
        $wp.appendChild(img);
    }
    reader.readAsDataURL(image);
}

document.addEventListener('paste', (e) => {
    e.preventDefault();
    let clipboardData = e.clipboardData || window.clipboardData;
    if (clipboardData) {
        let data = {};
        try {
            data.source = clipboardData.getData("text/html");
        } catch (error) {
            console.error(error);
        }

        if (data.source) {
            data.type = 'html';
        } else {
            // if (UserAgent.isIE) {
            //     data = clipboardData.getData("Text");
            // } else {
            //     data = clipboardData.getData("text/plain");
            // }
            data.source = clipboardData.getData("text/plain");
            if (data.source) {
                data.type = 'text';
            } else {
                let items = clipboardData.items;
                let fileItem;
                if (items && items.length) {
                    for (let i = 0; i < clipboardData.types.length; i++) {
                        if (clipboardData.types[i] === 'Files') {
                            fileItem = items[i];
                            break;
                        }
                    }
                    if (fileItem && fileItem.kind === 'file' && fileItem.type.match(/^image\//i)) {
                        data.source = fileItem.getAsFile();
                        data.type = 'image';
                    }
                }
            }
        }
        console.log(data.type);
        switch(data.type) {
            case 'html':
                pasteHtml(data.source);
                break;
            case 'text':
                pasteText(data.source);
                break;
            case 'image':
                pasteImage(data.source);
                break;
        }
    }
})