import { doc, getDoc, setDoc } from "firebase/firestore";
import { loginMessage } from "../features/watchlist-slice";
import { db } from "../firebase/Auth";

export async function addToWatchlist(e, videoInfo, user, dispatch ) {
    e.stopPropagation();
    console.log(user.uid)
    console.log(videoInfo)
    const watchlistRef = doc(db, 'watchlist', user.uid);
    const docSnap = await getDoc(watchlistRef);
    const videos = docSnap.data()?.videos;

    console.log(videos);
    
    if(videos) {
      const existingItem = videos.find(({id}) => id.videoId === videoInfo.id.videoId);

      if(existingItem) {
        dispatch(loginMessage({
          open: true,
          message: `Added To The Watchlist!!`,
          type: 'success'
        }))
      }
      else{
        // state.watchlist = [...state.watchlist, videoInfo]
        try {
          console.log('addtoFirestore called on click')
          await setDoc(watchlistRef, {
            videos: [...videos, videoInfo]
          }, { merge: true })
        } catch (error) {
          dispatch(loginMessage({
            open: true,
            message: error.message,
            type: 'error'
          }))
        }
        
        dispatch(loginMessage({
          open: true,
          message: `Added To The watchlist!!`,
          type: 'success'
        }))
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
        dispatch(loginMessage({
          open: true,
          message: error.message,
          type: 'error'
        }))
      } 

      dispatch(loginMessage({
        open: true,
        message: `Added To The Watchlist!!`,
        type: 'success'
      }))
    }
}

export async function channelDetailWatchlist({snippet}, user, dispatch ) {
  // const dispatch = useDispatch();
  console.log(user.uid)
  console.log(snippet)
  // dispatch(addWatchlist({videoInfo}))
  // console.log('i am clicked!!!');
  const watchlistRef = doc(db, 'watchlist', user.uid);
  const docSnap = await getDoc(watchlistRef);
  const videos = docSnap.data()?.videos;

  if(videos) {
    const existingItem = videos.find(({id}) => id.videoId === snippet.resourceId.videoId);

    if(existingItem) {
      dispatch(loginMessage({
        open: true,
        message: `Added To The Watchlist!!`,
        type: 'success'
      }))
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
        dispatch(loginMessage({
          open: true,
          message: error.message,
          type: 'error'
        }))
      } 

      dispatch(loginMessage({
        open: true,
        message: `Added To The Watchlist!!`,
        type: 'success'
      }))
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
      dispatch(loginMessage({
        open: true,
        message: error.message,
        type: 'error'
      }))
    } 

    dispatch(loginMessage({
      open: true,
      message: `Added To The Watchlist!!`,
      type: 'success'
    }))
  }
}