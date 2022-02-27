export const images = [
    'https://wmimg.azureedge.net/public/img/articles/11-things-to-improve-your-endurance-when-running/title.jpg',
    'https://thedailyguardian.com/wp-content/uploads/2021/01/4c7800d3_1289_P_5_mr-1.jpg',
    'https://i5.walmartimages.com/asr/f6f08089-31a5-4e6e-be37-62b885d1b65f.159498a4b60f8dd488c882bdbd22e8d0.jpeg',
    'https://theculturetrip.com/wp-content/uploads/2016/09/4701437938_dda5a47037_b.jpg',
    'https://thegromlife.com/wp-content/uploads/2021/07/surfing-board-sports.jpg',
    'https://s3.amazonaws.com/creativity-post/uploads/_articleHeader/iStock-519190164.jpg',
    'https://d3diggudo323be.cloudfront.net/wp-content/uploads/2018/11/18094617/Screen-Shot-2018-11-18-at-11.46.05.jpg',
    'https://lp-cms-production.imgix.net/features/2013/06/GettyRF_83654057-0d23ef9081fb.jpg',
    'https://ychef.files.bbci.co.uk/1376x774/p088gk4j.jpg',
    'https://media.wired.com/photos/61f48f02d0e55ccbebd52d15/3:2/w_1280%2Cc_limit/Gear-Rant-Game-Family-Plans-1334436001.jpg',
    'https://miro.medium.com/max/1200/1*TmvC86SuXrp18uL9e332aA.jpeg',
    'https://www.eureporter.co/wp-content/uploads/2021/06/Health-1.jpg',
    // tslint:disable-next-line:max-line-length
    'https://assets-news.housing.com/news/wp-content/uploads/2021/03/05173230/How-to-go-about-designing-an-indoor-garden-FB-1200x700-compressed.jpg',
    // tslint:disable-next-line:max-line-length
    'https://www.verywellfamily.com/thmb/hPJ5gOT2-KZz9iF9cyguucuFiqM=/1885x1414/smart/filters:no_upscale()/GettyImages-91947864-584826485f9b5851e5b39270.jpg',
    'https://cdn.mos.cms.futurecdn.net/KLZwUWe4JwyyXY7pV7CpaU.jpg',
    'https://betterme.world/articles/wp-content/uploads/2021/01/shutterstock_159630536.jpg',
    'https://www.usafa.edu/app/uploads/athletics-main-small.jpg',
    // tslint:disable-next-line:max-line-length
    'https://cdp.azureedge.net/products-private/slideshows/0a7d7955-b916-4d64-95e5-51f30794f9bc/da131efd-dac5-4d1f-9512-408fcf4fb7ed/df827d70-b2e9-46c5-852f-d3607ba9ca22.jpg',
    'https://global.eneos.com/gt/img/index_im03.jpg',
    'http://1.bp.blogspot.com/-ie3_KDFnJlY/Tnuc0PAJ2JI/AAAAAAAAC4U/uiKO2npxzuM/s1600/Dania+Sport.jpg',
    'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg',
    'https://media.cntraveler.com/photos/603fc7a599ab9b035e060f47/master/pass/OutdoorBrands-EddieBauer-2021-1.jpg',
    'https://www.quickanddirtytips.com/sites/default/files/images/5165/precise_and_accurate.jpg',
    // tslint:disable-next-line:max-line-length
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Giro_d%27Italia_2021%2C_Stage_15.jpg/1200px-Giro_d%27Italia_2021%2C_Stage_15.jpg',
    // tslint:disable-next-line:max-line-length
    'https://www.lifewire.com/thmb/_xG58tZ-fjQyhIrwal59ijp1bO0=/4587x3057/filters:no_upscale():max_bytes(150000):strip_icc()/speed-test-580e7a2b5f9b58564ce47143.png',
    'https://www.incimages.com/uploaded_files/image/1920x1080/getty_504265553_207771.jpg',
    'https://leevi.ee/wordpress/wp-content/uploads/2018/09/voistlustants.jpg',
    'https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1545238540/1545238539.jpg',
    'https://www.esdaw.eu/uploads/1/0/2/4/10241201/dograce10_orig.jpg',
    'https://cdn.dmcl.biz/media/image/207325/o/GettyImages-1024795236.jpg',
    'https://static01.nyt.com/images/2008/12/01/sports/02club_600.JPG',
    'https://tourscanner.com/blog/wp-content/uploads/2017/10/Featured-image.jpg',
    'https://linguapress.com/intermediate/images/downhill-skier.jpg',
    'https://cdn.radiofrance.fr/s3/cruiser-production/2021/08/772cfa6f-dc30-4b7c-a569-32210f25f154/1136_sports.jpg'
];


export const  getRandomImage = () => {
    const index =  Math.floor(Math.random() * images.length) + 1;
    return images[index];
};
