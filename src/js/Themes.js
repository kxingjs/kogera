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
        primary1Color: '#f8b500',
        textColor: Colors.blueGrey900,
        alternateTextColor: Colors.white,
        canvasColor: Colors.yellowA100,
    }
});

export const SmartCuteBlue = Object.assign({}, BaseTheme, {
    key: 'smart_blue',
    displayName: 'Smart Cute Blue',
    palette: {
        primary1Color: Colors.lightBlue200,
        accent1Color: Colors.orange400,
        canvasColor: Colors.lightBlue200,
    }
});


export const BirdGrey = Object.assign({}, BaseTheme, {
    key: 'bird_grey',
    displayName: 'Bird Grey',
    palette: {
        primary1Color: Colors.grey400,
        textColor: Colors.blueGrey500,
        alternateTextColor: Colors.white,
        canvasColor: Colors.tealA100,
    }
});

export const ArrowBlue = Object.assign({}, BaseTheme, {
    key: 'arrow_blue',
    displayName: 'Arrow Blue',
    palette: {
        primary1Color: '#4B64A1',
        textColor: Colors.blueGrey800,
        alternateTextColor: Colors.white,
        canvasColor: Colors.lightBlue50,
    }
});

export const NyamazingYellow = Object.assign({}, BaseTheme, {
    key: 'nyamazing_yellow',
    displayName: 'Nyamazing Yellow',
    palette: {
        primary1Color: Colors.yellowA400,
        textColor: Colors.teal900,
        alternateTextColor: Colors.white,
        canvasColor: Colors.yellowA100,
    }
});

export const SunshineRed = Object.assign({}, BaseTheme, {
    key: 'sunshine_red',
    displayName: 'Sunshine Red',
    palette: {
        primary1Color: Colors.red600,
        textColor: Colors.deepOrange900,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
    }
});

export const SpiritualViolet = Object.assign({}, BaseTheme, {
    key: 'spiritual_violet',
    displayName: 'Spiritual Violet',
    palette: {
        primary1Color: Colors.deepPurple400,
        textColor: Colors.blueGrey800,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
    }
});

export const OkomeGreen = Object.assign({}, BaseTheme, {
    key: 'okome_green',
    displayName: 'Okome Green',
    palette: {
        primary1Color: Colors.greenA400,
        textColor: Colors.cyan900,
        alternateTextColor: Colors.white,
        canvasColor: Colors.grey100,
    }
});

export const SmilePink = Object.assign({}, BaseTheme, {
    key: 'smile_pink',
    displayName: 'Smile Pink',
    palette: {
        primary1Color: Colors.pinkA200,
        textColor: Colors.pinkA700,
        alternateTextColor: Colors.white,
        // canvasColor: '#fce4ec'
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
