
const getBestImageUrl = (size='medium', imageUrls) => {
    if (imageUrls.length == 0) {
        return '';
    }

    let width;
    switch (size) {
        case 'small':
            width = '60';
            break;
        case 'medium':
            width = '300';
            break;
    }
    const image = imageUrls.find(img => img.width == width);
    return image ? image.url : imageUrls[0].url
};

export { getBestImageUrl };
