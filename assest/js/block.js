var screenWidth = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

if (screenWidth < 864) {
    window.location.href = "/block.html";
}