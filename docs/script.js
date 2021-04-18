var index = 0;
var memes = [];
var timer = 0;
var memeDisplayed = false;

window.onload = () => {
    setMessage("getting memes");
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://raw.githubusercontent.com/LesS2B/LesS2B/main/test/archive.json", false);
    rawFile.onreadystatechange = () => {
        if(rawFile.readyState === 4)
            if(rawFile.status === 200 || rawFile.status == 0)
                setup(JSON.parse(rawFile.responseText));
    }
    rawFile.send(null);

    let menuIcon = document.getElementById("menu-icon-content");
    let menuContainer = document.getElementById("menu-container");
    menuIcon.onclick = () => {
        if (menuIcon.style.transform == "rotate(90deg)") {
            menuIcon.style.transform = "rotate(0deg)";
            menuContainer.style.width = "0vw";
        }
        else {
            menuIcon.style.transform = "rotate(90deg)";
            menuContainer.style.width = "40vw";
        }
    }

    setInterval(nextPreview, 200);
}


function setup(data) {
    setMessage("loading memes ...");
    let list = document.getElementById("list-container");
    data.meme.forEach(el => {
        let index = memes.length;
        memes.push(null);
        let img = new Image();
        img.src = "images/"+el.path;
        img.onload = () => {
            memes[index] = {title: el.title, image: img};
            setMessage("loading memes ... "+index+" out of "+(memes.length-1));
            let container = document.createElement("div");
            let pic = document.createElement("img");
            let title = document.createElement("h2");
            container.classList.add("list-content-container");
            pic.src = img.src; pic.alt = el.title;
            pic.classList.add("list-content-pic");
            container.onclick = () => {setPreviewPic(index); timer = 4000;}
            title.classList.add("list-content-title");
            title.innerHTML = el.title;
            container.appendChild(pic);
            container.appendChild(title);
            list.appendChild(container);
            if (!memeDisplayed) {
                setPreviewPic(1);
                memeDisplayed = true;
            }
            if (index == memes.length-1)
                setTimeout(() => {
                    setMessage("");
                }, 2000);
        }
    });
} 

function setPreviewPic(i) {
    if (i >= memes.length) index = 0;
    else index = i;
    let content = document.getElementById("content");
    content.style.transform = "scale(0.9)";
    content.style.opacity = "0";
    setTimeout(() => {
        document.getElementById("image-content").src = memes[index].image.src;
        document.getElementById("title-content").innerHTML = memes[index].title;
        setTimeout(() => {
            content.style.transform = "scale(1)";
            content.style.opacity = "1";
        }, 10);
    }, 210);
}

function nextPreview() {
    timer -= 200;
    if (timer <= 0) {
        setPreviewPic(index+1);
        timer = 4000;
    }
}

function setMessage(msg) {
    document.getElementById("message-box").innerHTML = msg;
}