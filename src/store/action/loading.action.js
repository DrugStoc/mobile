import { HAS_ONBOARDED, START_LOADING, STOP_LOADING, UI_START_LOADING, UI_STOP_LOADING } from "../../utils/action.types"


export const startloading = () => {
    return {
        type: START_LOADING
    }
}

export const stoploading = () => {
    return {
        type: STOP_LOADING
    }
}

export const onboarded = () => {
    return {
        type: HAS_ONBOARDED
    }
}

export const ui_start_loading = () => {
    return {
        type: UI_START_LOADING
    }
}

export const ui_stop_loading = () => {
    return {
        type: UI_STOP_LOADING
    }
}

