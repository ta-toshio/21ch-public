/* eslint-disable */
const categories = [
  {
    id: '1',
    title: 'アニメ',
    description: '',
    subCategories: [
      {
        id: '1-1',
        title: 'アニメ速報',
        slug: 'anime-news',
        description: '### この板では、速報性と公共性のあるアニメ関連の情報を主に扱います。\n関連板も多いので、話題に適した板を使うよう心がけましょう。\n* <a href="/category/anime-salon">アニメサロン板</a>（アニメの雑談）\n* <a href="/category/anime">アニメ板</a>（アニメ作品別）\n※上記は関連他板のごく一部です。他の板もよく見て回りましょう。'
      },
      {
        id: '1-2',
        title: 'アニメサロン',
        slug: 'anime-salon',
        description: ''
      },
      {
        id: '1-3',
        title: 'アニメサロンex',
        slug: 'anime4vip',
        description: ''
      },
      { id: '1-4', title: 'アニメ', slug: 'anime', description: '' },
      { id: '1-5', title: 'アニメ２', slug: 'anime2', description: '' },
      {
        id: '1-6',
        title: 'アニメ新作情報',
        slug: 'anime-new',
        description: ''
      },
      { id: '1-7', title: 'アニメアンチ', slug: 'anime-anti', description: '' },
      {
        id: '1-8',
        title: '懐かしアニメ昭和',
        slug: 'anime-nostalgic-showa',
        description: ''
      },
      {
        id: '1-9',
        title: '懐かしアニメ平成',
        slug: 'anime-nostalgic-heisei',
        description: ''
      },
      { id: '1-10', title: 'アニメ映画', slug: 'anime-movie', description: '' },
      {
        id: '1-11',
        title: 'アニメキャラ総合',
        slug: 'anime-character',
        description: ''
      },
      {
        id: '1-12',
        title: 'アニメキャラ個別',
        slug: 'anime-character2',
        description: ''
      },
      { id: '1-15', title: '声優総合', slug: 'cv', description: '' },
      { id: '1-16', title: '声優個人', slug: 'cv2', description: '' }
    ]
  },
  {
    id: '2',
    title: 'ゲーム',
    subCategories: [
      { id: '2-1', title: 'ゲーム速報', slug: 'game-news', description: '' },
      { id: '2-2', title: 'ゲームサロン', slug: 'game-salon', description: '' },
      {
        id: '2-3',
        title: '家庭用ゲーム攻略',
        slug: 'game-walkthrough',
        description: ''
      },
      {
        id: '2-4',
        title: '家ゲーアクション攻略',
        slug: 'game-walkthrough-action',
        description: ''
      },
      {
        id: '2-5',
        title: '家ゲーRPG攻略',
        slug: 'game-walkthrough-rpg',
        description: ''
      },
      { id: '2-6', title: 'スマホゲーム', slug: 'game-sp', description: '' },
      { id: '2-7', title: '家ゲーRPG', slug: 'game-rpg', description: '' },
      { id: '2-8', title: 'FF・ドラクエ', slug: 'game-ff-dq', description: '' },
      { id: '2-9', title: '家ゲーSRPG', slug: 'game-srpg', description: '' },
      {
        id: '2-10',
        title: 'ロボットゲー',
        slug: 'game-robot',
        description: ''
      },
      { id: '2-11', title: 'ギャルゲー', slug: 'game-gal', description: '' },
      {
        id: '2-12',
        title: '女向ゲーム一般',
        slug: 'game-girl',
        description: ''
      },
      {
        id: '2-13',
        title: 'スポーツゲーム・レースゲーム',
        slug: 'game-sports',
        description: ''
      },
      {
        id: '2-14',
        title: '歴史ゲーム',
        slug: 'game-history',
        description: ''
      },
      { id: '2-15', title: '音ゲー', slug: 'game-music', description: '' },
      {
        id: '2-16',
        title: '格闘ゲーム',
        slug: 'game-fighting',
        description: ''
      },
      {
        id: '2-17',
        title: 'シューティング',
        slug: 'game-shooting',
        description: ''
      },
      {
        id: '2-18',
        title: 'PCアクション',
        slug: 'game-pc-action',
        description: ''
      },
      {
        id: '2-19',
        title: '東方project板',
        slug: 'game-touhou',
        description: ''
      },
      { id: '2-20', title: 'フライトシム', slug: 'game-fly', description: '' },
      {
        id: '2-21',
        title: '家庭用ゲーム',
        slug: 'game-home',
        description: ''
      },
      {
        id: '2-22',
        title: '家庭用ゲームZ区分（R-18) ',
        slug: 'game-z',
        description: ''
      },
      {
        id: '2-23',
        title: 'レトロゲーム',
        slug: 'game-retro',
        description: ''
      },
      {
        id: '2-24',
        title: '家庭用レトロゲーム',
        slug: 'game-home-retro',
        description: ''
      },
      {
        id: '2-25',
        title: '家庭用レトロゲーム32bit以上',
        slug: 'game-retro32',
        description: ''
      },
      { id: '2-26', title: 'アーケード', slug: 'game-arcade', description: '' },
      {
        id: '2-27',
        title: 'レトロアーケード・ハード',
        slug: 'game-arcade-hard',
        description: ''
      },
      {
        id: '2-28',
        title: 'メダル・プライズ・エレメカ・アミューズメント',
        slug: 'game-medal',
        description: ''
      },
      {
        id: '2-29',
        title: 'ゲーセン',
        slug: 'game-amusement-arcade',
        description: ''
      },
      { id: '2-30', title: 'PCゲーム', slug: 'game-pc', description: '' },
      { id: '2-31', title: '同人ゲーム', slug: 'game-doujin', description: '' },
      {
        id: '2-32',
        title: 'ブラウザゲーム',
        slug: 'game-browser',
        description: ''
      },
      { id: '2-33', title: '卓上ゲーム', slug: 'game-board', description: '' },
      { id: '2-34', title: 'TCG', slug: 'game-tcg', description: '' },
      { id: '2-35', title: '将棋・チェス', slug: 'game-b', description: '' },
      { id: '2-36', title: '囲碁・オセロ', slug: 'game-c', description: '' },
      { id: '2-37', title: 'クイズ雑学', slug: 'game-quiz', description: '' },
      {
        id: '2-38',
        title: 'ハード・業界',
        slug: 'game-industry',
        description: ''
      },
      {
        id: '2-39',
        title: 'モンハン',
        slug: 'game-monster-hunter',
        description: ''
      },
      { id: '2-40', title: '裏技・改造', slug: 'game-cheat', description: '' },
      {
        id: '2-41',
        title: 'ゲームキャラ',
        slug: 'game-character',
        description: ''
      },
      { id: '2-42', title: 'ゲーム音楽', slug: 'game-music', description: '' },
      {
        id: '2-43',
        title: 'Minecraft',
        slug: 'game-minecraft',
        description: ''
      },
      {
        id: '2-44',
        title: 'アイマス',
        slug: 'game-idolmaster',
        description: ''
      },
      { id: '2-45', title: '遊☆戯☆王', slug: 'game-yugioh', description: '' },
      { id: '2-46', title: 'Steam', slug: 'game-steam', description: '' },
      { id: '2-47', title: 'カードゲーム', slug: 'game-card', description: '' },
      {
        id: '2-48',
        title: 'デジタルカードゲーム',
        slug: 'game-digital-card',
        description: ''
      }
    ]
  },
  {
    id: '3',
    title: '携帯型ゲーム',
    subCategories: [
      {
        id: '3-1',
        title: '【携帯型ゲーム】携帯ゲームソフト',
        slug: 'portable-game',
        description: ''
      },
      {
        id: '3-2',
        title: '携帯ゲーム攻略',
        slug: 'portable-game-walkthrough',
        description: ''
      },
      {
        id: '3-3',
        title: '携帯ゲームRPG',
        slug: 'portable-game-rpg',
        description: ''
      },
      {
        id: '3-4',
        title: 'ポケモン',
        slug: 'portable-game-pokemon',
        description: ''
      },
      {
        id: '3-5',
        title: 'Wi-Fiコネクション',
        slug: 'portable-game-wifi',
        description: ''
      },
      {
        id: '3-6',
        title: '携帯ゲームレトロ',
        slug: 'portable-game-retro',
        description: ''
      },
      {
        id: '3-7',
        title: '携帯ゲームキャラクター',
        slug: 'portable-game-character',
        description: ''
      }
    ]
  },
  {
    id: '4',
    title: 'ネットゲーム',
    subCategories: [
      {
        id: '4-1',
        title: 'ネトゲ速報',
        slug: 'net-game-news',
        description: ''
      },
      { id: '4-2', title: 'ネトゲ質問', slug: 'net-game-qa', description: '' },
      {
        id: '4-3',
        title: 'ネトゲ実況',
        slug: 'net-game-live',
        description: ''
      },
      {
        id: '4-4',
        title: 'ネトゲ実況2',
        slug: 'net-game-live2',
        description: ''
      },
      {
        id: '4-5',
        title: 'ネトゲ実況3',
        slug: 'net-game-live3',
        description: ''
      },
      {
        id: '4-6',
        title: 'ネトゲサロン',
        slug: 'net-game-salon',
        description: ''
      },
      { id: '4-7', title: 'ネットゲーム', slug: 'net-game', description: '' },
      { id: '4-8', title: '大規模MMO', slug: 'net-game-mmo', description: '' },
      {
        id: '4-9',
        title: '小規模MMO',
        slug: 'net-game-mmo-minor',
        description: ''
      },
      { id: '4-10', title: 'PSO', slug: 'net-game-pso', description: '' },
      { id: '4-11', title: 'DQO', slug: 'net-game-dq', description: '' },
      { id: '4-12', title: 'FFO', slug: 'net-game-ff', description: '' }
    ]
  },
  {
    id: '5',
    title: '漫画',
    subCategories: [
      { id: '5-1', title: '漫画速報', slug: 'manga-news', description: '' },
      { id: '5-1', title: '漫画サロン', slug: 'manga-salon', description: '' },
      { id: '5-1', title: '漫画', slug: 'manga', description: '' },
      {
        id: '5-1',
        title: '懐かし漫画',
        slug: 'manga-nostalgic',
        description: ''
      },
      { id: '5-1', title: '少年漫画', slug: 'manga-young', description: '' },
      {
        id: '5-1',
        title: '週刊少年漫画',
        slug: 'manga-week-boy-comic',
        description: ''
      },
      {
        id: '5-1',
        title: '少女漫画',
        slug: 'manga-girl-comic',
        description: ''
      },
      { id: '5-1', title: '４コマ漫画', slug: 'manga-4koma', description: '' },
      {
        id: '5-1',
        title: '漫画キャラ',
        slug: 'manga-character',
        description: ''
      },
      {
        id: '5-1',
        title: '海外アニメ漫画',
        slug: 'manga-cartoon',
        description: ''
      },
      {
        id: '5-1',
        title: 'アニメ・漫画業界',
        slug: 'manga-industry',
        description: ''
      },
      {
        id: '5-1',
        title: '文芸・書籍サロン',
        slug: 'book-salon',
        description: ''
      },
      {
        id: '5-1',
        title: 'ライトノベル',
        slug: 'book-light-novel',
        description: ''
      },
      { id: '5-1', title: 'ミステリー', slug: 'book-mystery', description: '' },
      {
        id: '5-1',
        title: 'SF・Fantasy・ホラー',
        slug: 'book-sf',
        description: ''
      },
      {
        id: '5-1',
        title: '小説・ライトノベルキャラ',
        slug: 'book-light-novel-character',
        description: ''
      },
      { id: '5-1', title: '雑誌', slug: 'book-magazine', description: '' },
      { id: '5-1', title: '一般書籍', slug: 'book-p', description: '' },
      { id: '5-1', title: '電子書籍', slug: 'book-e', description: '' },
      { id: '5-1', title: '絵本', slug: 'book-ehon', description: '' },
      { id: '5-1', title: '児童書', slug: 'book-children', description: '' },
      {
        id: '5-1',
        title: 'イラストレーター',
        slug: 'book-illustrator',
        description: ''
      }
    ]
  },
  {
    id: '6',
    title: 'アニメ・漫画・ゲーム関連',
    subCategories: [
      { id: '6-1', title: '同人', slug: 'sc-doujin', description: '' },
      {
        id: '6-2',
        title: '同人イベント',
        slug: 'sc-doujin-event',
        description: ''
      },
      { id: '6-3', title: 'コスプレ', slug: 'sc-cosplay', description: '' },
      {
        id: '6-4',
        title: 'コスプレイヤー',
        slug: 'sc-cosplayer',
        description: ''
      },
      { id: '6-5', title: 'CCさくら', slug: 'sc-cc-sakura', description: '' },
      { id: '6-6', title: 'エヴァンゲリオン', slug: 'sc-eva', description: '' },
      {
        id: '6-7',
        title: 'ラブライブ！',
        slug: 'sc-lovelive',
        description: ''
      },
      {
        id: '6-8',
        title: 'アイドルマスタ',
        slug: 'sc-idolmaster',
        description: ''
      },
      { id: '6-9', title: '遊☆戯☆王', slug: 'sc-yugioh', description: '' },
      {
        id: '6-10',
        title: '魔法少女',
        slug: 'sc-magical-girls',
        description: ''
      }
    ]
  }
  // { id: '100', title: 'PINK', subCategories: []}
]
/* eslint-enable */
module.exports = categories
