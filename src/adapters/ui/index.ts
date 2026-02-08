import type {UiAdapter} from './ui-adapter';
import {nativeUiAdapter} from './native-adapter';
import {antdUiAdapter} from './antd-adapter';

/*
Switch UI library here (ONE line).

Example:
export const uiAdapter: UiAdapter = antdUiAdapter;
*/

export const uiAdapter: UiAdapter = nativeUiAdapter;
// export const uiAdapter: UiAdapter = antdUiAdapter;
