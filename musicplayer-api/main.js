const playBtn = document.getElementById("play-button");
const playImg = document.getElementById("play-img");
const muteBtn = document.getElementById("mute");
const muteImg = document.getElementById("mute-img");

// Song is playing
function playSong(){
    const isPlaying = playImg.classList.contains("paused");
    console.log(playImg.classList);
    
    if(!isPlaying){
        playImg.classList.add("paused");
        playImg.src = 'assets/pause-button.svg'
    }
    else{
        playImg.classList.remove("paused");
        playImg.src = 'assets/play-arrow.svg'
    }
    console.log(playImg.classList);
}
// Song is muted
function muteSong(){
    const isPlaying = muteImg.classList.contains("muted");
    console.log(muteImg.classList);
    
    if(!isPlaying){
        muteImg.classList.add("muted");
        muteImg.src = 'assets/volume.svg'
    }
    else{
        muteImg.classList.remove("muted");
        muteImg.src = 'assets/mute.svg'
    }
    console.log(muteImg.classList);
}

playBtn.addEventListener('click', ()=>{
    playSong();
});

muteBtn.addEventListener('click', () => {
    muteSong();
});

// Spotify SDK 
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQDNqflA8nkc_8WGHq3f07MXCuJYS2PXUOQGmLvN5OcwSQ74_eoTmtloWXnx8Xi-eil1PJsZ6XowcyLmiZfY6jFwsEvTEz3ZxKRO8j03jiGtEwBKu3wZ2wbF7mx0Cyyc0x5dhAyt4yOw57y5LUTxqBtHm1LXNTdeL0u_ytwvZWGPlky190c';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { 
        console.log(state);
        if(!state){
            console.log('You are not playing music through the Web Playback SDK');
            return;
        }

        let {
            current_track,
            next_tracks: [next_track]
        } = state.track_window;

        console.log('Currently playing', current_track);
        console.log('Playing next:', next_track);
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect().then(success => {
        if(success){
            console.log('Connected Successfully to spotify!');
        }
    });
    
};