export const DETAILS = {
    candy: {
        candy1: require('../../assets/details/candy1.png'),
        candy2: require('../../assets/details/candy2.png'),
        candy3: require('../../assets/details/candy3.png'),
    },
    flower: {
        flower1: require('../../assets/details/flower1.png'),
        flower2: require('../../assets/details/flower2.png'),
        flower3: require('../../assets/details/flower3.png'),
    },
    space: {
        space1: require('../../assets/details/space1.png'),
        space2: require('../../assets/details/space2.png'),
        space3: require('../../assets/details/space3.png'),
    },
};

export type DetailsCategory = keyof typeof DETAILS;
