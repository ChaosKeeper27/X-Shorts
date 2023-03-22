
const removeShorts = async () => {
    let all_video_links = document.querySelectorAll("ytd-grid-video-renderer");
    let counter = 0;

    while (all_video_links.length == 0){
        // This while loop is a back up to the 'load' event listenter
        // More often than not it does not do a good job a waiting
        // the delay helper makes sure we have videos before we move on
        await delay(1000);
        all_video_links = document.querySelectorAll("ytd-grid-video-renderer");
        
        if (counter > 10) {
            all_video_links = null;
            console.log("ERROR - YouTube Shorts not removed. Page load took to long. Check connection or refresh page.");
            break;
        } else {
            counter ++;            
        }
    }
  
    for (let i = 0; i < all_video_links.length; i++) {
        const video_link_element = all_video_links[i];
    
        let thumbnail_element = video_link_element.querySelector("#thumbnail");
    
        let overlay_style_attribute = thumbnail_element.getAttribute("href");
    
        if (overlay_style_attribute.search("shorts") != -1) {
            console.log("Found One");
            video_link_element.remove();
        }
    }
};

// delay helper function, runs on milliseconds
const delay = ms => new Promise(res => setTimeout(res, ms));

window.addEventListener('load', removeShorts());

