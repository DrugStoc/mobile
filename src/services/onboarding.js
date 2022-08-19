import AsyncStorage from '@react-native-async-storage/async-storage';
import { skip_for_now } from '../store/action/auth.action';
import { onboarded, startloading, stoploading } from "../store/action/loading.action";


export const get_started = () => {
    return async dispatch => {
        AsyncStorage.setItem('onboard', 'onboarded');
        dispatch(onboarded());
    }
}

export const check_if_user_is_onboarded = () => {
    return async dispatch => {
        dispatch(startloading())
        let returning_user = await AsyncStorage.getItem('onboard');
        if(returning_user) {
            dispatch(onboarded())
            dispatch(stoploading())
        } else {
            dispatch(stoploading())
            return;
        }
    }
}

export const skip_update_document_for_now = () => {
    return async dispatch => {
        let skip = await AsyncStorage.setItem('skip', 'skipped')
        dispatch(skip_for_now())
    }
}

export const check_if_skiiped = () => {
    return async dispatch => {
        let isSkipped = await AsyncStorage.getItem('skip')
        if (isSkipped) {
            dispatch(skip_for_now())
        }
    }
}