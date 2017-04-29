import React from 'react';
import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator'
import * as Spacing from 'material-ui/styles/spacing';

const BaseTheme = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    svgIcon: {
        color: Colors.darkBlack
    }
};

export const FightOrange = Object.assign({}, BaseTheme, {
    key: 'fight_orange',
    displayName: 'Fight Orange',
    palette: {
        primary1Color: Colors.amber400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.yellow50,
        borderColor: Colors.yellow300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

export const SmartCuteBlue = Object.assign({}, BaseTheme, {
    key: 'smart_blue',
    displayName: 'Smart Cute Blue',
    palette: {
        primary1Color: Colors.tealA400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});


export const BirdGrey = Object.assign({}, BaseTheme, {
    key: 'bird_grey',
    displayName: 'Bird Grey',
    palette: {
        primary1Color: Colors.tealA400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

export const ArrowBlue = Object.assign({}, BaseTheme, {
    key: 'arrow_blue',
    displayName: 'Arrow Blue',
    palette: {
        primary1Color: Colors.tealA400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

export const NyamazingYellow = Object.assign({}, BaseTheme, {
    key: 'nyamazing_yellow',
    displayName: 'Nyamazing Yellow',
    palette: {
        primary1Color: Colors.tealA400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

export const SunshineRed = Object.assign({}, BaseTheme, {
    key: 'sunshine_red',
    displayName: 'Sunshine Red',
    palette: {
        primary1Color: Colors.tealA400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

export const SpiritualViolet = Object.assign({}, BaseTheme, {
    key: 'spiritual_violet',
    displayName: 'Spiritual Violet',
    palette: {
        primary1Color: Colors.tealA400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

export const OkomeGreen = Object.assign({}, BaseTheme, {
    key: 'okome_green',
    displayName: 'Okome Green',
    palette: {
        primary1Color: Colors.tealA400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

export const SmilePink = Object.assign({}, BaseTheme, {
    key: 'smile_pink',
    displayName: 'Smile Pink',
    palette: {
        primary1Color: Colors.tealA400,
        primary2Color: Colors.tealA700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange400,
        accent2Color: Colors.orange700,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

const Themes = [
    FightOrange,
    SmartCuteBlue,
    BirdGrey,
    ArrowBlue,
    NyamazingYellow,
    SunshineRed,
    SpiritualViolet,
    OkomeGreen,
    SmilePink
];

export function loadTheme(key) {
    if (typeof name !== 'string') {
        throw new Error('Missing/invalid Theme key.');
    }

    const theme = Themes.find((theme) => {
        return theme.key == key;
    });

    return theme || BaseTheme;
}

export default Themes;
