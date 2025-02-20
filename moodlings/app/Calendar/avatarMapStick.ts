export type Mood = 'Happy' | 'Sad' | 'Angry';
export type AvatarType = 'bunny' | 'fox' | 'raccoon' | 'elephant' | 'monkey' | 'opossum';

const avatarMap: Record<AvatarType, Record<Mood, AvatarType>> = {
    bunny: {
        Happy: require('../../assets/avatars/bunny/sticker/bunnyhappy.png'),
        Sad: require('../../assets/avatars/bunny/sticker/bunnysad.png'),
        Angry: require('../../assets/avatars/bunny/sticker/bunnyangry.png'),
    },
    fox: {
        Happy: require('../../assets/avatars/fox/sticker/foxhappy.png'),
        Sad: require('../../assets/avatars/fox/sticker/foxsad.png'),
        Angry: require('../../assets/avatars/fox/sticker/foxangry.png'),
    },
    raccoon: {
        Happy: require('../../assets/avatars/racoon/sticker/racoonhappy.png'),
        Sad: require('../../assets/avatars/racoon/sticker/racoonsad.png'),
        Angry: require('../../assets/avatars/racoon/sticker/racoonangry.png'),
    },
    elephant: {
        Happy: require('../../assets/avatars/elephant/sticker/elephanthappy.png'),
        Sad: require('../../assets/avatars/elephant/sticker/elephantsad.png'),
        Angry: require('../../assets/avatars/elephant/sticker/elephantangry.png'),
    },
    monkey: {
        Happy: require('../../assets/avatars/monkey/sticker/monkeyhappy.png'),
        Sad: require('../../assets/avatars/monkey/sticker/monkeysad.png'),
        Angry: require('../../assets/avatars/monkey/sticker/monkeyangry.png'),
    },
    opossum: {
        Happy: require('../../assets/avatars/opossum/sticker/opossumhappy.png'),
        Sad: require('../../assets/avatars/opossum/sticker/opossumsad.png'),
        Angry: require('../../assets/avatars/opossum/sticker/opossumangry.png'),
    },
};

export default avatarMap;
