import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/Auth";

export async function addToWatchlist(e, videoInfo, user ) {
    e.stopPropagation();
    console.log(user.uid)
    console.log(videoInfo)
    // dispatch(addWatchlist({videoInfo}))
    // console.log('i am clicked!!!');
    const watchlistRef = doc(db, 'watchlist', user.uid);
    const docSnap = await getDoc(watchlistRef);
    const videos = docSnap.data().videos;

    if(videos.length) {
      const existingItem = videos.find(({id}) => id.videoId === videoInfo.id.videoId);

      if(existingItem) {
        console.log('Already in the wishlist...')
      }
      else{
        // state.watchlist = [...state.watchlist, videoInfo]
        try {
          console.log('addtoFirestore called on click')
          await setDoc(watchlistRef, {
            videos: [...videos, videoInfo]
          }, { merge: true })
        } catch (error) {
          console.log(error)
        } 
      }
    }
    else{
      console.log('No video in the firestore');
      try {
        console.log('addtoFirestore called on click(no data in firestore)')
        await setDoc(watchlistRef, {
          videos: [videoInfo]
        }, { merge: true })
      } catch (error) {
        console.log(error)
      } 
    }
}

export async function channelDetailWatchlist({snippet}, user ) {
  console.log(user.uid)
  console.log(snippet)
  // dispatch(addWatchlist({videoInfo}))
  // console.log('i am clicked!!!');
  const watchlistRef = doc(db, 'watchlist', user.uid);
  const docSnap = await getDoc(watchlistRef);
  const videos = docSnap.data().videos;

  if(videos.length) {
    const existingItem = videos.find(({id}) => id.videoId === snippet.resourceId.videoId);

    if(existingItem) {
      console.log('Already in the wishlist...')
    }
    else{
      // state.watchlist = [...state.watchlist, videoInfo]
      try {
        console.log('addtoFirestore called on click')
        await setDoc(watchlistRef, {
          videos: [...videos,
             {
              id: snippet.resourceId,
              snippet: snippet
             }]
        }, { merge: true })
      } catch (error) {
        console.log(error)
      } 
    }
  }
  else{
    console.log('No video in the firestore');
    try {
      console.log('addtoFirestore called on click(no data in firestore)')
      await setDoc(watchlistRef, {
        videos: [videoInfo]
      }, { merge: true })
    } catch (error) {
      console.log(error)
    } 
  }
}