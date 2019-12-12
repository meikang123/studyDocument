// 方案1
const img = document.getElementById('#img');
const bool = img.getBoundingClientRect().top < document.documentElement.clientHeight;
window.onscroll = function() {

};

// 方案2 --IE不支持
const obsever = new IntersectionObserver((changes) => {
    changes.forEach((change) => {
        if(change.isIntersecting) {
            const img = change.target;
            img.src = img.dataset.src;
            obsever.unobserve(img);
        }
    })
});

obsever.observe(img);

// 方案3 --只有chrome支持
// <img src="img.jpg" loading="lazy">