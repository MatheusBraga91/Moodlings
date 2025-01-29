export type Mood = 'Happy' | 'Sad' | 'Angry';
export type AvatarType = 'bunny' | 'fox' | 'raccoon';

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
};

export default avatarMap;
