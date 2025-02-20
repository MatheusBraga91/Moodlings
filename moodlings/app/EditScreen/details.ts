export const DETAILS = {
    candy: [
        require('../../assets/details/candy1.png'),
        require('../../assets/details/candy2.png'),
        require('../../assets/details/candy3.png'),
    ],
    flower: [
        require('../../assets/details/flower1.png'),
        require('../../assets/details/flower2.png'),
        require('../../assets/details/flower3.png'),
    ],
    space: [
        require('../../assets/details/space1.png'),
        require('../../assets/details/space2.png'),
        require('../../assets/details/space3.png'),
    ],
};

export type DetailsCategory = keyof typeof DETAILS;