
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('joke').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('joke').insert([
       {
        id:1,
        question:'So, I lost my job at the bank today...',
        answer:'An old lady asked me for her balance today... so i pushed her over.',
        public:true,
        joke_owner:'DadBOT101',
        thumb_ups:2,
        thumb_downs:2,
        hearts:0
       },
       {
        id:2,
        question:'I\'m reading a book about anti-gravity',
        answer:'It\'s impossible to put down!',
        public:true,
        joke_owner:'DadBOT203',
        thumb_ups:2,
        thumb_downs:1,
        hearts:0
       },
       {
        id:3,
        question:'What do you call someone with no body and no nose? ',
        answer:'Nobody knows.',
        public:true,
        joke_owner:'DadBOT204',
        thumb_ups:1,
        thumb_downs:2,
        hearts:0
       },
       {
        id:4,
        question:'I ordered a chicken and an egg from Amazon.',
        answer:'I\'ll let you know',
        public:true,
        joke_owner: 'DadBOT101',
        thumb_ups:9,
        thumb_downs:12,
        hearts:0
       },
       {
        id:5,
        question:'MOM: "How do I look?"',
        answer:'DAD: "With your eyes."',
        public:true,
        joke_owner:'DadBOT203',
        thumb_ups:22,
        thumb_downs:23,
        hearts:0
       },
       {
        id:6,
        question:'Why can\'t you hear a pterodactyl go to the bathroom?',
        answer:'Because the pee is silent.',
        public:true,
        joke_owner: 'DadBOT101',
        thumb_ups:22,
        thumb_downs:222,
        hearts:0
       },
       {
        id:7,
        question:'What does a zombie vegetarian eat? ',
        answer:'GRRRAAAAAIIIINNNNS!',
        public:true,
        joke_owner: 'DadBOT101',
        thumb_ups:42,
        thumb_downs:12,
        hearts:0
       },
       {
        id:8,
        question:'What has two butts and kills people?',
        answer:'An assassin',
        public:false,
        joke_owner:'DadBOT204',
        thumb_ups:2,
        thumb_downs:2,
        hearts:0
       },
       {
        id:9,
        question:'What did the pirate say on his 80th birthday? ',
        answer:'AYE MATEY',
        public:false,
        joke_owner: 'DadBOT101',
        thumb_ups:2,
        thumb_downs:2,
        hearts:0
       },
       {
        id:10,
        question:'What time did the man go to the dentist?',
        answer:'Tooth hurt-y.',
        public:false,
        joke_owner:'DadBOT204',
        thumb_ups:2,
        thumb_downs:2,
        hearts:0
       },
       {
        id:11,
        question:'What’s Forrest Gump’s password?',
        answer:'1forrest1',
        public:false,
        joke_owner: 'DadBOT101',
        thumb_ups:2,
        thumb_downs:4,
        hearts:0
       },
       {
        id:12,
        question:'Can February March?',
        answer:'No, but April May!',
        public:false,
        joke_owner:'DadBOT203',
        thumb_ups:1,
        thumb_downs:2,
        hearts:0
       },
      ]);
    });
};
