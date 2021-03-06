import _ from 'lodash';
import validator from 'validator';

import * as Utils from '../api/utils.js';
import * as UtilStore from '../api/utilStore.js';
import * as ServerActions from './serverActions.js';
import * as DeskPageActions from './deskPageActions.js';

export const SHOW_MODAL_COMPONENT_VARIANT = 'SHOW_MODAL_COMPONENT_VARIANT';
export const HIDE_MODAL_COMPONENT_VARIANT = 'HIDE_MODAL_COMPONENT_VARIANT';
export const COMPONENT_VARIANT_START_STEP_0 = 'COMPONENT_VARIANT_START_STEP_0';
export const COMPONENT_VARIANT_SUBMIT_STEP_0 = 'COMPONENT_VARIANT_SUBMIT_STEP_0';
export const COMPONENT_VARIANT_START_STEP_1 = 'COMPONENT_VARIANT_START_STEP_1';
export const COMPONENT_VARIANT_SUBMIT_STEP_1 = 'COMPONENT_VARIANT_SUBMIT_STEP_1';
export const COMPONENT_VARIANT_START_STEP_2 = 'COMPONENT_VARIANT_START_STEP_2';
export const COMPONENT_VARIANT_SUBMIT_STEP_2 = 'COMPONENT_VARIANT_SUBMIT_STEP_2';

export function showModalComponentVariant(){
    return {
        type: SHOW_MODAL_COMPONENT_VARIANT
    }
}

export function hideModalComponentVariant(){
    return {
        type: HIDE_MODAL_COMPONENT_VARIANT
    }
}

export function startStep0(options){

    return {
        type: COMPONENT_VARIANT_START_STEP_0
    };

}

export function submitStep0(options){

    return (dispatch, getState) => {


        let { deskPage: { searchResult } } = getState();
        let defaultsModel = {
            variantName: options.variantName,
            type: searchResult.found.type,
            props: searchResult.found.props,
            children: searchResult.found.children,
            text: searchResult.found.text
        };

        dispatch(
            ServerActions.invoke('addComponentDefaults',
                {
                    componentName: searchResult.found.type,
                    defaultsModel: defaultsModel
                },
                [COMPONENT_VARIANT_START_STEP_1]
            )
        );
    }
}

export function startStep1(){

    return {
        type: COMPONENT_VARIANT_START_STEP_1
    }
}

