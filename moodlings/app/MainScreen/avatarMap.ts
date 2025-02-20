import { ImageProps } from "react-native";

export type Mood = 'Default' | 'Happy' | 'Sad' | 'Angry';
export type AvatarType = 'bunny' | 'fox' | 'raccoon' | 'elephant' | 'monkey' | 'opossum';
type AvatarMap = Record<AvatarType, Record<Mood, ImageProps>>
const avatarMap: AvatarMap = {
    bunny: {
        Default: require('../../assets/avatars/bunny/bunnydefault.png'),
        Happy: require('../../assets/avatars/bunny/bunnyhappy.png'),
        Sad: require('../../assets/avatars/bunny/bunnysad.png'),
        Angry: require('../../assets/avatars/bunny/bunnyangry.png'),
    },
    fox: {
        Default: require('../../assets/avatars/fox/foxdefault.png'),
        Happy: require('../../assets/avatars/fox/foxhappy.png'),
        Sad: require('../../assets/avatars/fox/foxsad.png'),
        Angry: require('../../assets/avatars/fox/foxangry.png'),
    },
    raccoon: {
        Default: require('../../assets/avatars/racoon/racoondefault.png'),
        Happy: require('../../assets/avatars/racoon/racoonhappy.png'),
        Sad: require('../../assets/avatars/racoon/racoonsad.png'),
        Angry: require('../../assets/avatars/racoon/racoonangry.png'),
    },
    elephant: {
        Default: require('../../assets/avatars/elephant/elephantdefault.png'),
        Happy: require('../../assets/avatars/elephant/elephanthappy.png'),
        Sad: require('../../assets/avatars/elephant/elephantsad.png'),
        Angry: require('../../assets/avatars/elephant/elephantangry.png'),
    },
    monkey: {
        Default: require('../../assets/avatars/monkey/monkeydefault.png'),
        Happy: require('../../assets/avatars/monkey/monkeyhappy.png'),
        Sad: require('../../assets/avatars/monkey/monkeysad.png'),
        Angry: require('../../assets/avatars/monkey/monkeyangry.png'),
    },
    opossum: {
        Default: require('../../assets/avatars/opossum/opossumdefault.png'),
        Happy: require('../../assets/avatars/opossum/opossumhappy.png'),
        Sad: require('../../assets/avatars/opossum/opossumsad.png'),
        Angry: require('../../assets/avatars/opossum/opossumangry.png'),
    },
};

export default avatarMap;

