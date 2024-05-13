import {takeLatest, put, all, call} from 'redux-saga/effects';

import {USER_ACTION_TYPES} from './user.types';

import { signInSuccess,signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed} from './user.action';

import { 
    getCurrentUser,
     createUserDocumentFromAuth,
      signInWithGooglePopup,
      createAuthUserWithEmailAndPassword,
      signInAuthUserWithEmailAndPassword,
      signOutUser} from '../../utils/firebase/firebaseutils';


// This function takes userAuth and additionalDetails as parameters
export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try{
         // Call the `createUserDocumentFromAuth` function with userAuth and additionalDetails
        // This function is assumed to be a generator function that creates a user document in a database from the provided authentication data
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
       // Log the userSnapshot and its data to the console
        console.log(userSnapshot)
        console.log(userSnapshot.data());
         // Dispatch the `signInSuccess` action with user data if the operation is successful
        yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data() }))
    }catch(error){
        yield put(signInFailed(error));

    }
}

export function* signInAfterSignUp({payload:{user, additionalDetails }}){
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signUp({payload: {email, password, displayName }}){
    try{
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, {displayName}));

    }catch(error){
        yield put(signUpFailed(error));
    }

}

export function* signOut(){
        try{
            yield call(signOutUser);
            yield put(signOutSuccess())
        }catch(error){
            yield put(signOutFailed(error));
        }
        
}

export function*  signInWithEmail({payload:{email, password}}){
    try{
        const {user} = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuth, user);

    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user)
    }catch(error){
       yield put(signInFailed(error)); 
    }
}



// This function checks if the user is authenticated
export function* isUserAuthenticated(){
    try{
         // Attempt to get the current user authentication status
        const userAuth = yield call(getCurrentUser);
         // If user authentication status is falsy, return early
        if(!userAuth) return;
        // If authentication is successful, call getSnapshotFromUserAuth with userAuth
        yield call(getSnapshotFromUserAuth, userAuth);
    }catch (error){

    }
}

export function* OnEmailSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGoogleSignInStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

// This function listens for a specific action type and triggers isUserAuthenticated when that action is dispatched
export function* onCheckUserSession(){
   yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated) 
}

export function* onSignUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}
export  function* userSaga(){
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(OnEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}