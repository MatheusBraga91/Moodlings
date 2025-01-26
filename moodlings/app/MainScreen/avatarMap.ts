export type Mood = 'Default' | 'Happy' | 'Sad' | 'Angry';
export type AvatarType = 'bunny' | 'fox' | 'raccoon';

const avatarMap: Record<AvatarType, Record<Mood, AvatarType>> = {
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
};

export default avatarMap;
