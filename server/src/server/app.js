require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { userRouter } = require("../routes/users");
const { scrapingRouter } = require("../routes/scraping");
const { followRouter } = require("../routes/follows");
const { watchlistRouter } = require("../routes/watchlist");
const { wishlistRouter } = require("../routes/wishlist");
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

app.use('/follows', followRouter);
app.use('/users', userRouter);
app.use('/scraping', scrapingRouter);
app.use('/watchlist', watchlistRouter);
app.use('/wishlist', wishlistRouter);

app.get('/series', async (req, res) => {
    const series = [{
        "_id": {
          "$oid": "63b336f63210e1b92b48c4fb"
        },
        "name": "Wednesday",
        "first_air_date": {
          "$date": {
            "$numberLong": "1669161600000"
          }
        },
        "original_language": "en",
        "overview": "Wednesday Addams is sent to Nevermore Academy, a bizarre boarding school where she attempts to master her psychic powers, stop a monstrous killing spree of the town citizens, and solve the supernatural mystery that affected her family 25 years ago — all while navigating her new relationships.",
        "poster_path": "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        "popularity": 3300.207,
        "vote_average": 8.72,
        "vote_count": 4412,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c4fc"
        },
        "name": "Yellowstone",
        "first_air_date": {
          "$date": {
            "$numberLong": "1529452800000"
          }
        },
        "original_language": "en",
        "overview": "Follow the violent world of the Dutton family, who controls the largest contiguous ranch in the United States. Led by their patriarch John Dutton, the family defends their property against constant attack by land developers, an Indian reservation, and America’s first National Park.",
        "poster_path": "/peNC0eyc3TQJa6x4TdKcBPNP4t0.jpg",
        "popularity": 1545.756,
        "vote_average": 8.099,
        "vote_count": 1359,
        "number_of_seasons": 5,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f9"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c4fd"
        },
        "name": "The Witcher: Blood Origin",
        "first_air_date": {
          "$date": {
            "$numberLong": "1671926400000"
          }
        },
        "original_language": "en",
        "overview": "More than a thousand years before the world of The Witcher, seven outcasts in the elven world unite in a blood quest against an unstoppable power.",
        "poster_path": "/vpfJK9F0UJNcAIIeC42oJyKMnZQ.jpg",
        "popularity": 1243.158,
        "vote_average": 6.392,
        "vote_count": 167,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c4fe"
        },
        "name": "Bhagya Lakshmi",
        "first_air_date": {
          "$date": {
            "$numberLong": "1627948800000"
          }
        },
        "original_language": "en",
        "overview": "Hailing from a middle-class family, Lakshmi’s life is upended when she realises that her marriage to Rishi Oberoi, an industrialist’s son, is a sham to keep his death at bay.",
        "poster_path": "/7wuKrFvbX7kAIF0ctotARsqayPo.jpg",
        "popularity": 933.947,
        "vote_average": 5.278,
        "vote_count": 9,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f6"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c4ff"
        },
        "name": "¿Cómo se llama esta relación?",
        "first_air_date": {
          "$date": {
            "$numberLong": "1635292800000"
          }
        },
        "original_language": "en",
        "overview": "The new stage of Yeh Rishta Kya Kehlata Hai will deal with the rivalry between sisters set within the premise of a love triangle. It will basically revolve around the story of two sisters, Akshara and Aarohi, and how they get entangled in a relationship with their love interest, Abhimanyu.",
        "poster_path": "/6ZfiG4P7jivJV0wgcNMSiS2Owhh.jpg",
        "popularity": 870.325,
        "vote_average": 6,
        "vote_count": 2,
        "number_of_seasons": 1,
        "genre_ids": [],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c500"
        },
        "name": "Tulsa King",
        "first_air_date": {
          "$date": {
            "$numberLong": "1668297600000"
          }
        },
        "original_language": "en",
        "overview": "Just after he is released from prison after 25 years, New York mafia capo Dwight “The General” Manfredi is unceremoniously exiled by his boss to set up shop in Tulsa, Okla. Realizing that his mob family may not have his best interests in mind, Dwight slowly builds a “crew” from a group of unlikely characters, to help him establish a new criminal empire in a place that to him might as well be another planet.",
        "poster_path": "/fwTv3RPRAIy0maOMns5eYRRwnDk.jpg",
        "popularity": 683.701,
        "vote_average": 8.757,
        "vote_count": 144,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c501"
        },
        "name": "Rick and Morty",
        "first_air_date": {
          "$date": {
            "$numberLong": "1385942400000"
          }
        },
        "original_language": "en",
        "overview": "Rick is a mentally-unbalanced but scientifically gifted old man who has recently reconnected with his family. He spends most of his time involving his young grandson Morty in dangerous, outlandish adventures throughout space and alternate universes. Compounded with Morty's already unstable family life, these events cause Morty much distress at home and school.",
        "poster_path": "/cvhNj9eoRBe5SxjCbQTkh05UP5K.jpg",
        "popularity": 670.721,
        "vote_average": 8.729,
        "vote_count": 7658,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c502"
        },
        "name": "Cuomo",
        "first_air_date": {
          "$date": {
            "$numberLong": "1664755200000"
          }
        },
        "original_language": "en",
        "overview": "A no-nonsense show featuring the day’s most important news from all perspectives.",
        "poster_path": "/jg7nEqNlgkFQxkSNcLlVn66LXjk.jpg",
        "popularity": 661.483,
        "vote_average": 3.364,
        "vote_count": 11,
        "number_of_seasons": 2,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f3"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f7"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c503"
        },
        "name": "The Simpsons",
        "first_air_date": {
          "$date": {
            "$numberLong": "629856000000"
          }
        },
        "original_language": "en",
        "overview": "Set in Springfield, the average American town, the show focuses on the antics and everyday adventures of the Simpson family; Homer, Marge, Bart, Lisa and Maggie, as well as a virtual cast of thousands. Since the beginning, the series has been a pop culture icon, attracting hundreds of celebrities to guest star. The show has also made name for itself in its fearless satirical take on politics, media and American life in general.",
        "poster_path": "/zI3E2a3WYma5w8emI35mgq5Iurx.jpg",
        "popularity": 631.9,
        "vote_average": 7.98,
        "vote_count": 8477,
        "number_of_seasons": 34,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f0"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c504"
        },
        "name": "Grey's Anatomy",
        "first_air_date": {
          "$date": {
            "$numberLong": "1111881600000"
          }
        },
        "original_language": "en",
        "overview": "Follows the personal and professional lives of a group of doctors at Seattle’s Grey Sloan Memorial Hospital.",
        "poster_path": "/daSFbrt8QCXV2hSwB0hqYjbj681.jpg",
        "popularity": 614.514,
        "vote_average": 8.255,
        "vote_count": 8733,
        "number_of_seasons": 19,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c505"
        },
        "name": "Willow",
        "first_air_date": {
          "$date": {
            "$numberLong": "1669766400000"
          }
        },
        "original_language": "en",
        "overview": "Many years after the events of the original film, legendary sorcerer Willow leads a group of misfit heroes on a dangerous rescue mission through a world beyond their wildest imaginations.",
        "poster_path": "/jhdSPDlhswjN1r6O0pGP3ZvQgU8.jpg",
        "popularity": 555.019,
        "vote_average": 6.968,
        "vote_count": 124,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c506"
        },
        "name": "Law & Order: Special Victims Unit",
        "first_air_date": {
          "$date": {
            "$numberLong": "937785600000"
          }
        },
        "original_language": "en",
        "overview": "In the criminal justice system, sexually-based offenses are considered especially heinous. In New York City, the dedicated detectives who investigate these vicious felonies are members of an elite squad known as the Special Victims Unit. These are their stories.",
        "poster_path": "/ywBt4WKADdMVgxTR1rS2uFwMYTH.jpg",
        "popularity": 520.913,
        "vote_average": 8,
        "vote_count": 3122,
        "number_of_seasons": 24,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c507"
        },
        "name": "The Walking Dead",
        "first_air_date": {
          "$date": {
            "$numberLong": "1288483200000"
          }
        },
        "original_language": "en",
        "overview": "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way.",
        "poster_path": "/xf9wuDcqlUPWABZNeDKPbZUjWx0.jpg",
        "popularity": 500.316,
        "vote_average": 8.112,
        "vote_count": 14300,
        "number_of_seasons": 11,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c508"
        },
        "name": "The Blacklist",
        "first_air_date": {
          "$date": {
            "$numberLong": "1379894400000"
          }
        },
        "original_language": "en",
        "overview": "Raymond \"Red\" Reddington, one of the FBI's most wanted fugitives, surrenders in person at FBI Headquarters in Washington, D.C. He claims that he and the FBI have the same interests: bringing down dangerous criminals and terrorists. In the last two decades, he's made a list of criminals and terrorists that matter the most but the FBI cannot find because it does not know they exist. Reddington calls this \"The Blacklist\". Reddington will co-operate, but insists that he will speak only to Elizabeth Keen, a rookie FBI profiler.",
        "poster_path": "/htJzeRcYI2ewMm4PTrg98UMXShe.jpg",
        "popularity": 495.806,
        "vote_average": 7.582,
        "vote_count": 2555,
        "number_of_seasons": 10,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c509"
        },
        "name": "Lucifer",
        "first_air_date": {
          "$date": {
            "$numberLong": "1453680000000"
          }
        },
        "original_language": "en",
        "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
        "poster_path": "/ekZobS8isE6mA53RAiGDG93hBxL.jpg",
        "popularity": 491.471,
        "vote_average": 8.503,
        "vote_count": 12941,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c50a"
        },
        "name": "The Flash",
        "first_air_date": {
          "$date": {
            "$numberLong": "1412640000000"
          }
        },
        "original_language": "en",
        "overview": "After a particle accelerator causes a freak storm, CSI Investigator Barry Allen is struck by lightning and falls into a coma. Months later he awakens with the power of super speed, granting him the ability to move through Central City like an unseen guardian angel. Though initially excited by his newfound powers, Barry is shocked to discover he is not the only \"meta-human\" who was created in the wake of the accelerator explosion -- and not everyone is using their new powers for good. Barry partners with S.T.A.R. Labs and dedicates his life to protect the innocent. For now, only a few close friends and associates know that Barry is literally the fastest man alive, but it won't be long before the world learns what Barry Allen has become...The Flash.",
        "poster_path": "/lJA2RCMfsWoskqlQhXPSLFQGXEJ.jpg",
        "popularity": 463.616,
        "vote_average": 7.806,
        "vote_count": 10113,
        "number_of_seasons": 9,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c50b"
        },
        "name": "House of the Dragon",
        "first_air_date": {
          "$date": {
            "$numberLong": "1661040000000"
          }
        },
        "original_language": "en",
        "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
        "poster_path": "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
        "popularity": 447.769,
        "vote_average": 8.491,
        "vote_count": 2712,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c50c"
        },
        "name": "Peaky Blinders",
        "first_air_date": {
          "$date": {
            "$numberLong": "1378944000000"
          }
        },
        "original_language": "en",
        "overview": "A gangster family epic set in 1919 Birmingham, England and centered on a gang who sew razor blades in the peaks of their caps, and their fierce boss Tommy Shelby, who means to move up in the world.",
        "poster_path": "/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
        "popularity": 433.365,
        "vote_average": 8.552,
        "vote_count": 7976,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c50d"
        },
        "name": "Game of Thrones",
        "first_air_date": {
          "$date": {
            "$numberLong": "1302998400000"
          }
        },
        "original_language": "en",
        "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
        "poster_path": "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
        "popularity": 423.346,
        "vote_average": 8.435,
        "vote_count": 20111,
        "number_of_seasons": 8,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c50e"
        },
        "name": "Supernatural",
        "first_air_date": {
          "$date": {
            "$numberLong": "1126569600000"
          }
        },
        "original_language": "en",
        "overview": "When they were boys, Sam and Dean Winchester lost their mother to a mysterious and demonic supernatural force. Subsequently, their father raised them to be soldiers. He taught them about the paranormal evil that lives in the dark corners and on the back roads of America ... and he taught them how to kill it. Now, the Winchester brothers crisscross the country in their '67 Chevy Impala, battling every kind of supernatural threat they encounter along the way. ",
        "poster_path": "/KoYWXbnYuS3b0GyQPkbuexlVK9.jpg",
        "popularity": 405.586,
        "vote_average": 8.296,
        "vote_count": 6344,
        "number_of_seasons": 15,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c50f"
        },
        "name": "Criminal Minds",
        "first_air_date": {
          "$date": {
            "$numberLong": "1127347200000"
          }
        },
        "original_language": "en",
        "overview": "An elite team of FBI profilers analyze the country's most twisted criminal minds, anticipating their next moves before they strike again. The Behavioral Analysis Unit's most experienced agent is David Rossi, a founding member of the BAU who returns to help the team solve new cases.",
        "poster_path": "/7TCwgX7oQKxcWYEhSPRmaHe6ULN.jpg",
        "popularity": 396.536,
        "vote_average": 8.329,
        "vote_count": 3137,
        "number_of_seasons": 16,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c510"
        },
        "name": "The Recruit",
        "first_air_date": {
          "$date": {
            "$numberLong": "1671148800000"
          }
        },
        "original_language": "en",
        "overview": "A fledgling lawyer at the CIA that becomes enmeshed in dangerous international power politics when a former asset threatens to expose the nature of her long-term relationship with the agency unless they exonerate her of a serious crime.",
        "poster_path": "/mLbFg0u2DPYuB5CILzwWk3kdI8b.jpg",
        "popularity": 391.298,
        "vote_average": 7.9,
        "vote_count": 87,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c511"
        },
        "name": "The Lord of the Rings: The Rings of Power",
        "first_air_date": {
          "$date": {
            "$numberLong": "1661990400000"
          }
        },
        "original_language": "en",
        "overview": "Beginning in a time of relative peace, we follow an ensemble cast of characters as they confront the re-emergence of evil to Middle-earth. From the darkest depths of the Misty Mountains, to the majestic forests of Lindon, to the breathtaking island kingdom of Númenor, to the furthest reaches of the map, these kingdoms and characters will carve out legacies that live on long after they are gone.",
        "poster_path": "/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg",
        "popularity": 377.603,
        "vote_average": 7.538,
        "vote_count": 1729,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c512"
        },
        "name": "Breaking Bad",
        "first_air_date": {
          "$date": {
            "$numberLong": "1200787200000"
          }
        },
        "original_language": "en",
        "overview": "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
        "poster_path": "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        "popularity": 369.92,
        "vote_average": 8.859,
        "vote_count": 10737,
        "number_of_seasons": 5,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c513"
        },
        "name": "The Good Doctor",
        "first_air_date": {
          "$date": {
            "$numberLong": "1506297600000"
          }
        },
        "original_language": "en",
        "overview": "Shaun Murphy, a young surgeon with autism and savant syndrome, relocates from a quiet country life to join a prestigious hospital's surgical unit. Unable to personally connect with those around him, Shaun uses his extraordinary medical gifts to save lives and challenge the skepticism of his colleagues.",
        "poster_path": "/luhKkdD80qe62fwop6sdrXK9jUT.jpg",
        "popularity": 357.954,
        "vote_average": 8.527,
        "vote_count": 11019,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c514"
        },
        "name": "Doctor Who",
        "first_air_date": {
          "$date": {
            "$numberLong": "1111795200000"
          }
        },
        "original_language": "en",
        "overview": "The Doctor is a Time Lord: a 900 year old alien with 2 hearts, part of a gifted civilization who mastered time travel. The Doctor saves planets for a living—more of a hobby actually, and the Doctor's very, very good at it.",
        "poster_path": "/sz4zF5z9zyFh8Z6g5IQPNq91cI7.jpg",
        "popularity": 354.055,
        "vote_average": 7.401,
        "vote_count": 2486,
        "number_of_seasons": 13,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c515"
        },
        "name": "1883",
        "first_air_date": {
          "$date": {
            "$numberLong": "1639872000000"
          }
        },
        "original_language": "en",
        "overview": "Follow the Dutton family as they embark on a journey west through the Great Plains toward the last bastion of untamed America. A stark retelling of Western expansion, and an intense study of one family fleeing poverty to seek a better future in America’s promised land — Montana.",
        "poster_path": "/qduRygYeQc50UIxN3tNwtvwvqj5.jpg",
        "popularity": 351.821,
        "vote_average": 8.421,
        "vote_count": 240,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f9"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c516"
        },
        "name": "Suits",
        "first_air_date": {
          "$date": {
            "$numberLong": "1308787200000"
          }
        },
        "original_language": "en",
        "overview": "While running from a drug deal gone bad, Mike Ross, a brilliant young college-dropout, slips into a job interview with one of New York City's best legal closers, Harvey Specter. Tired of cookie-cutter law school grads, Harvey takes a gamble by hiring Mike on the spot after he recognizes his raw talent and photographic memory.",
        "poster_path": "/vQiryp6LioFxQThywxbC6TuoDjy.jpg",
        "popularity": 326.242,
        "vote_average": 8.196,
        "vote_count": 3981,
        "number_of_seasons": 9,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c517"
        },
        "name": "NCIS",
        "first_air_date": {
          "$date": {
            "$numberLong": "1064275200000"
          }
        },
        "original_language": "en",
        "overview": "From murder and espionage to terrorism and stolen submarines, a team of special agents investigates any crime that has a shred of evidence connected to Navy and Marine Corps personnel, regardless of rank or position.",
        "poster_path": "/2exOHePjOTquUsbThPGhuEjYTyA.jpg",
        "popularity": 321.715,
        "vote_average": 7.611,
        "vote_count": 1918,
        "number_of_seasons": 20,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c518"
        },
        "name": "Stranger Things",
        "first_air_date": {
          "$date": {
            "$numberLong": "1468540800000"
          }
        },
        "original_language": "en",
        "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        "poster_path": "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        "popularity": 316.4,
        "vote_average": 8.638,
        "vote_count": 14723,
        "number_of_seasons": 4,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c519"
        },
        "name": "South Park",
        "first_air_date": {
          "$date": {
            "$numberLong": "871430400000"
          }
        },
        "original_language": "en",
        "overview": "Follows the misadventures of four irreverent grade-schoolers in the quiet, dysfunctional town of South Park, Colorado.",
        "poster_path": "/iiCY2QIGSnmtVkIdjkKAfwDs0KF.jpg",
        "popularity": 313.454,
        "vote_average": 8.327,
        "vote_count": 3272,
        "number_of_seasons": 25,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c51a"
        },
        "name": "Chucky",
        "first_air_date": {
          "$date": {
            "$numberLong": "1633996800000"
          }
        },
        "original_language": "en",
        "overview": "After a vintage Chucky doll turns up at a suburban yard sale, an idyllic American town is thrown into chaos as a series of horrifying murders begin to expose the town’s hypocrisies and secrets. Meanwhile, the arrival of enemies — and allies — from Chucky’s past threatens to expose the truth behind the killings, as well as the demon doll’s untold origins.",
        "poster_path": "/kY0BogCM8SkNJ0MNiHB3VTM86Tz.jpg",
        "popularity": 307.321,
        "vote_average": 7.862,
        "vote_count": 3583,
        "number_of_seasons": 2,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c51b"
        },
        "name": "Coronation Street",
        "first_air_date": {
          "$date": {
            "$numberLong": "-285984000000"
          }
        },
        "original_language": "en",
        "overview": "The residents of Coronation Street are ordinary, working-class people, and the show follows them through regular social and family interactions at home, in the workplace, and in their local pub, the Rovers Return Inn. Britain's longest-running soap.",
        "poster_path": "/xe6y8SJU0NyGEECu2LV9cXoY81g.jpg",
        "popularity": 306.695,
        "vote_average": 5.27,
        "vote_count": 74,
        "number_of_seasons": 64,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f6"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c51c"
        },
        "name": "Family Guy",
        "first_air_date": {
          "$date": {
            "$numberLong": "917740800000"
          }
        },
        "original_language": "en",
        "overview": "Sick, twisted, politically incorrect and Freakin' Sweet animated series featuring the adventures of the dysfunctional Griffin family. Bumbling Peter and long-suffering Lois have three kids. Stewie (a brilliant but sadistic baby bent on killing his mother and taking over the world), Meg (the oldest, and is the most unpopular girl in town) and Chris (the middle kid, he's not very bright but has a passion for movies). The final member of the family is Brian - a talking dog and much more than a pet, he keeps Stewie in check whilst sipping Martinis and sorting through his own life issues.",
        "poster_path": "/aLB7psB9N81n5GecHNOudXWW3AI.jpg",
        "popularity": 300.102,
        "vote_average": 7.246,
        "vote_count": 3598,
        "number_of_seasons": 21,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c51d"
        },
        "name": "Vikings",
        "first_air_date": {
          "$date": {
            "$numberLong": "1362268800000"
          }
        },
        "original_language": "en",
        "overview": "The adventures of Ragnar Lothbrok, the greatest hero of his age. The series tells the sagas of Ragnar's band of Viking brothers and his family, as he rises to become King of the Viking tribes. As well as being a fearless warrior, Ragnar embodies the Norse traditions of devotion to the gods. Legend has it that he was a direct descendant of Odin, the god of war and warriors.",
        "poster_path": "/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg",
        "popularity": 299.745,
        "vote_average": 8.08,
        "vote_count": 5887,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f8"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c51e"
        },
        "name": "Friends",
        "first_air_date": {
          "$date": {
            "$numberLong": "780192000000"
          }
        },
        "original_language": "en",
        "overview": "Six young people from New York City, on their own and struggling to survive in the real world, find the companionship, comfort and support they get from each other to be the perfect antidote to the pressures of life.",
        "poster_path": "/f496cm9enuEsZkSPzCwnTESEK5s.jpg",
        "popularity": 299.446,
        "vote_average": 8.464,
        "vote_count": 6455,
        "number_of_seasons": 10,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c51f"
        },
        "name": "His Dark Materials",
        "first_air_date": {
          "$date": {
            "$numberLong": "1572739200000"
          }
        },
        "original_language": "en",
        "overview": "Lyra is an orphan who lives in a parallel universe in which science, theology, and magic are intertwined. Her search for a kidnapped friend uncovers a sinister plot involving stolen children and turns into a quest to understand a mysterious phenomenon called Dust. She is later joined on her journey by Will, a boy who possesses a knife that can cut windows between worlds. As she learns the truth about her parents and her prophesied destiny, the two young people are caught up in a war against celestial powers that ranges across many worlds.",
        "poster_path": "/1ljcoM9hFNiXpcoevZQwwc7oCYT.jpg",
        "popularity": 297.037,
        "vote_average": 7.991,
        "vote_count": 1278,
        "number_of_seasons": 3,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c520"
        },
        "name": "The Mentalist",
        "first_air_date": {
          "$date": {
            "$numberLong": "1222128000000"
          }
        },
        "original_language": "en",
        "overview": "Patrick Jane, a former celebrity psychic medium, uses his razor sharp skills of observation and expertise at \"reading\" people to solve serious crimes with the California Bureau of Investigation.",
        "poster_path": "/acYXu4KaDj1NIkMgObnhe4C4a0T.jpg",
        "popularity": 293.666,
        "vote_average": 8.401,
        "vote_count": 3048,
        "number_of_seasons": 7,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c521"
        },
        "name": "PBS NewsHour",
        "first_air_date": {
          "$date": {
            "$numberLong": "182995200000"
          }
        },
        "original_language": "en",
        "overview": "America's first and longest running hour-long nightly news broadcast known for its in-depth coverage of issues and current events.",
        "poster_path": "/5nfFB1wHQmNxkjaMNNMendPIRzb.jpg",
        "popularity": 289.286,
        "vote_average": 5.4,
        "vote_count": 36,
        "number_of_seasons": 13,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f3"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c522"
        },
        "name": "Bones",
        "first_air_date": {
          "$date": {
            "$numberLong": "1126569600000"
          }
        },
        "original_language": "en",
        "overview": "Dr. Temperance Brennan and her colleagues at the Jeffersonian's Medico-Legal Lab assist Special Agent Seeley Booth with murder investigations when the remains are so badly decomposed, burned or destroyed that the standard identification methods are useless.",
        "poster_path": "/eyTu5c8LniVciRZIOSHTvvkkgJa.jpg",
        "popularity": 288.354,
        "vote_average": 8.298,
        "vote_count": 2656,
        "number_of_seasons": 12,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c523"
        },
        "name": "CNN This Morning",
        "first_air_date": {
          "$date": {
            "$numberLong": "1667260800000"
          }
        },
        "original_language": "en",
        "overview": "Stories from across the world and refreshing conversations with Don Lemon, Poppy Harlow, and Kaitlan Collins.",
        "poster_path": "/5DkevfTePhz0GoiUd7bmg6uYePf.jpg",
        "popularity": 286.802,
        "vote_average": 3.833,
        "vote_count": 3,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f3"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c524"
        },
        "name": "Dahmer – Monster: The Jeffrey Dahmer Story",
        "first_air_date": {
          "$date": {
            "$numberLong": "1663718400000"
          }
        },
        "original_language": "en",
        "overview": "This series examines the gruesome and horrific true crimes of Jeffrey Dahmer and the systemic failures that enabled one of America’s most notorious serial killers to continue his murderous spree in plain sight for over a decade.",
        "poster_path": "/f2PVrphK0u81ES256lw3oAZuF3x.jpg",
        "popularity": 285.476,
        "vote_average": 8.133,
        "vote_count": 1804,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f63210e1b92b48c525"
        },
        "name": "The Vampire Diaries",
        "first_air_date": {
          "$date": {
            "$numberLong": "1252540800000"
          }
        },
        "original_language": "en",
        "overview": "The story of two vampire brothers obsessed with the same girl, who bears a striking resemblance to the beautiful but ruthless vampire they knew and loved in 1864.",
        "poster_path": "/agkRkx58t6Ai8AqUOHBOGjRyUGW.jpg",
        "popularity": 277.647,
        "vote_average": 8.349,
        "vote_count": 7776,
        "number_of_seasons": 8,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c526"
        },
        "name": "Echo 3",
        "first_air_date": {
          "$date": {
            "$numberLong": "1669075200000"
          }
        },
        "original_language": "en",
        "overview": "When brilliant scientist Amber Chesborough vanishes along the Colombia-Venezuela border, her brother and her husband—both elite U.S. Army commandos—struggle to find her amid a guerilla war, discovering that the woman they love might have a secret.",
        "poster_path": "/xG94Dc7LJ0NEYZ0hGTNnHuMKugl.jpg",
        "popularity": 272.803,
        "vote_average": 7.4,
        "vote_count": 28,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c527"
        },
        "name": "Shameless",
        "first_air_date": {
          "$date": {
            "$numberLong": "1294531200000"
          }
        },
        "original_language": "en",
        "overview": "Chicagoan Frank Gallagher is the proud single dad of six smart, industrious, independent kids, who without him would be... perhaps better off. When Frank's not at the bar spending what little money they have, he's passed out on the floor. But the kids have found ways to grow up in spite of him. They may not be like any family you know, but they make no apologies for being exactly who they are.",
        "poster_path": "/9akij7PqZ1g6zl42DQQTtL9CTSb.jpg",
        "popularity": 259.149,
        "vote_average": 8.141,
        "vote_count": 1978,
        "number_of_seasons": 11,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c528"
        },
        "name": "Halo",
        "first_air_date": {
          "$date": {
            "$numberLong": "1648080000000"
          }
        },
        "original_language": "en",
        "overview": "Depicting an epic 26th-century conflict between humanity and an alien threat known as the Covenant, the series weaves deeply drawn personal stories with action, adventure and a richly imagined vision of the future.",
        "poster_path": "/nJUHX3XL1jMkk8honUZnUmudFb9.jpg",
        "popularity": 257.037,
        "vote_average": 8.422,
        "vote_count": 1566,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c529"
        },
        "name": "The Peripheral",
        "first_air_date": {
          "$date": {
            "$numberLong": "1666224000000"
          }
        },
        "original_language": "en",
        "overview": "Stuck in a small Appalachian town, a young woman’s only escape from the daily grind is playing advanced video games. She is such a good player that a company sends her a new video game system to test…but it has a surprise in store. It unlocks all of her dreams of finding a purpose, romance, and glamour in what seems like a game…but it also puts her and her family in real danger.",
        "poster_path": "/ccBe5BVeibdBEQU7l6P6BubajWV.jpg",
        "popularity": 248.745,
        "vote_average": 8.056,
        "vote_count": 483,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c52a"
        },
        "name": "Law & Order",
        "first_air_date": {
          "$date": {
            "$numberLong": "653184000000"
          }
        },
        "original_language": "en",
        "overview": "In cases ripped from the headlines, police investigate serious and often deadly crimes, weighing the evidence and questioning the suspects until someone is taken into custody. The district attorney's office then builds a case to convict the perpetrator by proving the person guilty beyond a reasonable doubt. Working together, these expert teams navigate all sides of the complex criminal justice system to make New York a safer place.",
        "poster_path": "/l7qr5Q5iJXeja9iDmdXagoUZ0Vm.jpg",
        "popularity": 246.344,
        "vote_average": 7.566,
        "vote_count": 392,
        "number_of_seasons": 22,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c52b"
        },
        "name": "Richard Osman's House of Games",
        "first_air_date": {
          "$date": {
            "$numberLong": "1504483200000"
          }
        },
        "original_language": "en",
        "overview": "Each week a group of four famous faces go toe to toe in testing their general knowledge skills in a variety of entertaining games.",
        "poster_path": "/g1D2iBtf39IdPGBNB6Nsy6oJRXr.jpg",
        "popularity": 240.502,
        "vote_average": 6.154,
        "vote_count": 13,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f7"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c52c"
        },
        "name": "House",
        "first_air_date": {
          "$date": {
            "$numberLong": "1100563200000"
          }
        },
        "original_language": "en",
        "overview": "Dr. Gregory House, a drug-addicted, unconventional, misanthropic medical genius, leads a team of diagnosticians at the fictional Princeton–Plainsboro Teaching Hospital in New Jersey.",
        "poster_path": "/lkvhReTBZ2Ksl0Dl5Oplsf6UYkF.jpg",
        "popularity": 236.025,
        "vote_average": 8.618,
        "vote_count": 5177,
        "number_of_seasons": 8,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c52d"
        },
        "name": "Fear the Walking Dead",
        "first_air_date": {
          "$date": {
            "$numberLong": "1440288000000"
          }
        },
        "original_language": "en",
        "overview": "What did the world look like as it was transforming into the horrifying apocalypse depicted in \"The Walking Dead\"? This spin-off set in Los Angeles, following new characters as they face the beginning of the end of the world, will answer that question.",
        "poster_path": "/zyshFjmlDXSzfns2Qk81cfIFfPP.jpg",
        "popularity": 232.919,
        "vote_average": 7.695,
        "vote_count": 4336,
        "number_of_seasons": 8,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c52e"
        },
        "name": "The 100",
        "first_air_date": {
          "$date": {
            "$numberLong": "1395187200000"
          }
        },
        "original_language": "en",
        "overview": "100 years in the future, when the Earth has been abandoned due to radioactivity, the last surviving humans live on an ark orbiting the planet — but the ark won't last forever. So the repressive regime picks 100 expendable juvenile delinquents to send down to Earth to see if the planet is still habitable.",
        "poster_path": "/wcaDIAG1QdXQLRaj4vC1EFdBT2.jpg",
        "popularity": 229.824,
        "vote_average": 7.92,
        "vote_count": 7334,
        "number_of_seasons": 7,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c52f"
        },
        "name": "American Dad!",
        "first_air_date": {
          "$date": {
            "$numberLong": "1107648000000"
          }
        },
        "original_language": "en",
        "overview": "The series focuses on an eccentric motley crew that is the Smith family and their three housemates: Father, husband, and breadwinner Stan Smith; his better half housewife, Francine Smith; their college-aged daughter, Hayley Smith; and their high-school-aged son, Steve Smith. Outside of the Smith family, there are three additional main characters, including Hayley's boyfriend turned husband, Jeff Fischer; the family's man-in-a-goldfish-body pet, Klaus; and most notably the family's zany alien, Roger, who is \"full of masquerades, brazenness, and shocking antics.\"",
        "poster_path": "/aC1q422YhQR7k82GB8gW4KoD91p.jpg",
        "popularity": 226.35,
        "vote_average": 6.886,
        "vote_count": 1690,
        "number_of_seasons": 19,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c530"
        },
        "name": "Columbo",
        "first_air_date": {
          "$date": {
            "$numberLong": "53740800000"
          }
        },
        "original_language": "en",
        "overview": "Columbo is a friendly, verbose, disheveled-looking police detective who is consistently underestimated by his suspects. Despite his unprepossessing appearance and apparent absentmindedness, he shrewdly solves all of his cases and secures all evidence needed for indictment. His formidable eye for detail and meticulously dedicated approach often become clear to the killer only late in the storyline.",
        "poster_path": "/2JCD8vab3fircOU8cM2HJCxfv4I.jpg",
        "popularity": 225.682,
        "vote_average": 8.056,
        "vote_count": 479,
        "number_of_seasons": 10,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c531"
        },
        "name": "Two and a Half Men",
        "first_air_date": {
          "$date": {
            "$numberLong": "1064188800000"
          }
        },
        "original_language": "en",
        "overview": "A hedonistic jingle writer's free-wheeling life comes to an abrupt halt when his brother and 10-year-old nephew move into his beach-front house.",
        "poster_path": "/A9QDK4OWpv41W27kCv0LXe30k9S.jpg",
        "popularity": 225.365,
        "vote_average": 7.433,
        "vote_count": 2519,
        "number_of_seasons": 12,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c532"
        },
        "name": "Seinfeld",
        "first_air_date": {
          "$date": {
            "$numberLong": "615600000000"
          }
        },
        "original_language": "en",
        "overview": "A stand-up comedian and his three offbeat friends weather the pitfalls and payoffs of life in New York City in the '90s. It's a show about nothing.",
        "poster_path": "/aCw8ONfyz3AhngVQa1E2Ss4KSUQ.jpg",
        "popularity": 225.037,
        "vote_average": 8.3,
        "vote_count": 1477,
        "number_of_seasons": 9,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c533"
        },
        "name": "Fargo",
        "first_air_date": {
          "$date": {
            "$numberLong": "1397520000000"
          }
        },
        "original_language": "en",
        "overview": "A close-knit anthology series dealing with stories involving malice, violence and murder based in and around Minnesota.",
        "poster_path": "/9ZIhl17uFlXCNUputSEDHwZYIEJ.jpg",
        "popularity": 220.621,
        "vote_average": 8.299,
        "vote_count": 2056,
        "number_of_seasons": 4,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c534"
        },
        "name": "The Boys",
        "first_air_date": {
          "$date": {
            "$numberLong": "1564012800000"
          }
        },
        "original_language": "en",
        "overview": "A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.",
        "poster_path": "/stTEycfG9928HYGEISBFaG1ngjM.jpg",
        "popularity": 219.665,
        "vote_average": 8.472,
        "vote_count": 7881,
        "number_of_seasons": 4,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c535"
        },
        "name": "PAW Patrol",
        "first_air_date": {
          "$date": {
            "$numberLong": "1376265600000"
          }
        },
        "original_language": "en",
        "overview": "PAW Patrol is a CG action-adventure for old children and preschool series starring a pack of six heroic puppies led by a tech-savvy 10-year-old boy named Ryder.",
        "poster_path": "/8HXkgUBO5OF8ZK9XbY69RM4S5rv.jpg",
        "popularity": 214.716,
        "vote_average": 6.949,
        "vote_count": 583,
        "number_of_seasons": 9,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f1"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c536"
        },
        "name": "The Last Kingdom",
        "first_air_date": {
          "$date": {
            "$numberLong": "1444435200000"
          }
        },
        "original_language": "en",
        "overview": "A show of heroic deeds and epic battles with a thematic depth that embraces politics, religion, warfare, courage, love, loyalty and our universal search for identity. Combining real historical figures and events with fictional characters, it is the story of how a people combined their strength under one of the most iconic kings of history in order to reclaim their land for themselves and build a place they call home.",
        "poster_path": "/8eJf0hxgIhE6QSxbtuNCekTddy1.jpg",
        "popularity": 212.673,
        "vote_average": 8.28,
        "vote_count": 1311,
        "number_of_seasons": 5,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f8"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c537"
        },
        "name": "She-Hulk: Attorney at Law",
        "first_air_date": {
          "$date": {
            "$numberLong": "1660780800000"
          }
        },
        "original_language": "en",
        "overview": "Jennifer Walters navigates the complicated life of a single, 30-something attorney who also happens to be a green 6-foot-7-inch superpowered hulk.",
        "poster_path": "/hJfI6AGrmr4uSHRccfJuSsapvOb.jpg",
        "popularity": 210.459,
        "vote_average": 6.6,
        "vote_count": 1425,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c538"
        },
        "name": "Smallville",
        "first_air_date": {
          "$date": {
            "$numberLong": "1003190400000"
          }
        },
        "original_language": "en",
        "overview": "The origins of the world’s greatest hero–from Krypton refugee Kal-el’s arrival on Earth through his tumultuous teen years to Clark Kent’s final steps toward embracing his destiny as the Man of Steel.",
        "poster_path": "/pUhJGETy2sec4vEkiqJ9eGeIywc.jpg",
        "popularity": 209.329,
        "vote_average": 8.246,
        "vote_count": 3420,
        "number_of_seasons": 10,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c539"
        },
        "name": "Emily in Paris",
        "first_air_date": {
          "$date": {
            "$numberLong": "1601596800000"
          }
        },
        "original_language": "en",
        "overview": "When ambitious Chicago marketing exec Emily unexpectedly lands her dream job in Paris, she embraces a new life as she juggles work, friends and romance.",
        "poster_path": "/Ak59Y9bzykmV0wAiwKsqrbORDBo.jpg",
        "popularity": 209.148,
        "vote_average": 7.879,
        "vote_count": 1006,
        "number_of_seasons": 3,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c53a"
        },
        "name": "EastEnders",
        "first_air_date": {
          "$date": {
            "$numberLong": "477619200000"
          }
        },
        "original_language": "en",
        "overview": "The everyday lives of working-class residents of Albert Square, a traditional Victorian square of terrace houses surrounding a park in the East End of London's Walford borough.",
        "poster_path": "/z4jgyI5TpoRZiJTNchkVkMrGQyz.jpg",
        "popularity": 209.107,
        "vote_average": 3.9,
        "vote_count": 183,
        "number_of_seasons": 39,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f6"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c53b"
        },
        "name": "Castle",
        "first_air_date": {
          "$date": {
            "$numberLong": "1236556800000"
          }
        },
        "original_language": "en",
        "overview": "After a serial killer imitates the plots of his novels, successful mystery novelist Richard \"Rick\" Castle receives permission from the Mayor of New York City to tag along with an NYPD homicide investigation team for research purposes.",
        "poster_path": "/diXBeMzvfJb2iJg3G0kCUaMCzEc.jpg",
        "popularity": 207.536,
        "vote_average": 8.016,
        "vote_count": 1492,
        "number_of_seasons": 8,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c53c"
        },
        "name": "Blue Bloods",
        "first_air_date": {
          "$date": {
            "$numberLong": "1285286400000"
          }
        },
        "original_language": "en",
        "overview": "A drama about a multi-generational family of cops dedicated to New York City law enforcement. Frank Reagan is the New York Police Commissioner and heads both the police force and the Reagan brood. He runs his department as diplomatically as he runs his family, even when dealing with the politics that plagued his unapologetically bold father, Henry, during his stint as Chief.",
        "poster_path": "/nWYB1Pn3bNKQnTp4sWqyUxPTLI1.jpg",
        "popularity": 206.538,
        "vote_average": 7.662,
        "vote_count": 627,
        "number_of_seasons": 13,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c53d"
        },
        "name": "The Witcher",
        "first_air_date": {
          "$date": {
            "$numberLong": "1576800000000"
          }
        },
        "original_language": "en",
        "overview": "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
        "poster_path": "/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
        "popularity": 205.178,
        "vote_average": 8.202,
        "vote_count": 4352,
        "number_of_seasons": 2,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c53e"
        },
        "name": "Euphoria",
        "first_air_date": {
          "$date": {
            "$numberLong": "1560643200000"
          }
        },
        "original_language": "en",
        "overview": "A group of high school students navigate love and friendships in a world of drugs, sex, trauma, and social media.",
        "poster_path": "/jtnfNzqZwN4E32FGGxx1YZaBWWf.jpg",
        "popularity": 200.912,
        "vote_average": 8.387,
        "vote_count": 8400,
        "number_of_seasons": 2,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c53f"
        },
        "name": "Sonic Prime",
        "first_air_date": {
          "$date": {
            "$numberLong": "1671062400000"
          }
        },
        "original_language": "en",
        "overview": "When an explosive battle with Dr. Eggman shatters the universe, Sonic races through parallel dimensions to reconnect with his friends and save the world.",
        "poster_path": "/1Hie7gCDsvt7wtPRuUAk4ZzaoQa.jpg",
        "popularity": 200.736,
        "vote_average": 8.427,
        "vote_count": 89,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f0"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c540"
        },
        "name": "The Amazing World of Gumball",
        "first_air_date": {
          "$date": {
            "$numberLong": "1304294400000"
          }
        },
        "original_language": "en",
        "overview": "The life of Gumball Watterson, a 12-year old cat who attends middle school in Elmore. Accompanied by his pet, adoptive brother, and best friend Darwin Watterson, he frequently finds himself involved in various shenanigans around the city, during which he interacts with various family members: Anais, Richard, and Nicole Watterson, and other various citizens.",
        "poster_path": "/VYnnyA2hyxi3VUPgCA71mMtt69.jpg",
        "popularity": 200.011,
        "vote_average": 8.547,
        "vote_count": 1118,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f0"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c541"
        },
        "name": "The Office",
        "first_air_date": {
          "$date": {
            "$numberLong": "1111622400000"
          }
        },
        "original_language": "en",
        "overview": "The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.",
        "poster_path": "/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
        "popularity": 199.209,
        "vote_average": 8.588,
        "vote_count": 2879,
        "number_of_seasons": 9,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c542"
        },
        "name": "Modern Family",
        "first_air_date": {
          "$date": {
            "$numberLong": "1253664000000"
          }
        },
        "original_language": "en",
        "overview": "The Pritchett-Dunphy-Tucker clan is a wonderfully large and blended family. They give us an honest and often hilarious look into the sometimes warm, sometimes twisted, embrace of the modern family.",
        "poster_path": "/fu5vEUHgxkAPmX26ISQXqHmlPMq.jpg",
        "popularity": 198.263,
        "vote_average": 7.787,
        "vote_count": 2042,
        "number_of_seasons": 11,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c543"
        },
        "name": "Brooklyn Nine-Nine",
        "first_air_date": {
          "$date": {
            "$numberLong": "1379376000000"
          }
        },
        "original_language": "en",
        "overview": "A single-camera ensemble comedy following the lives of an eclectic group of detectives in a New York precinct, including one slacker who is forced to shape up when he gets a new boss.",
        "poster_path": "/hgRMSOt7a1b8qyQR68vUixJPang.jpg",
        "popularity": 197.375,
        "vote_average": 8.249,
        "vote_count": 2504,
        "number_of_seasons": 8,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c544"
        },
        "name": "CSI: Crime Scene Investigation",
        "first_air_date": {
          "$date": {
            "$numberLong": "970790400000"
          }
        },
        "original_language": "en",
        "overview": "A Las Vegas team of forensic investigators are trained to solve criminal cases by scouring the crime scene, collecting irrefutable evidence and finding the missing pieces that solve the mystery.",
        "poster_path": "/9XecVOLLkbGBNnpF2PvP8vQBmww.jpg",
        "popularity": 196.268,
        "vote_average": 7.655,
        "vote_count": 938,
        "number_of_seasons": 15,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c545"
        },
        "name": "Chicago P.D.",
        "first_air_date": {
          "$date": {
            "$numberLong": "1389139200000"
          }
        },
        "original_language": "en",
        "overview": "A riveting police drama about the men and women of the Chicago Police Department's District 21 who put it all on the line to serve and protect their community. District 21 is made up of two distinctly different groups: the uniformed cops who patrol the beat and go head-to-head with the city's street crimes and the Intelligence Unit that combats the city's major offenses - organized crime, drug trafficking, high profile murders and beyond.",
        "poster_path": "/7gtp4lusk685hdmuEXMbYrmSQoY.jpg",
        "popularity": 194.037,
        "vote_average": 8.433,
        "vote_count": 2031,
        "number_of_seasons": 10,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c546"
        },
        "name": "Chicago Fire",
        "first_air_date": {
          "$date": {
            "$numberLong": "1349827200000"
          }
        },
        "original_language": "en",
        "overview": "An edge-of-your-seat view into the lives of everyday heroes committed to one of America's noblest professions. For the firefighters, rescue squad and paramedics of Chicago Firehouse 51, no occupation is more stressful or dangerous, yet so rewarding and exhilarating. These courageous men and women are among the elite who forge headfirst into danger when everyone else is running the other way and whose actions make the difference between life and death.",
        "poster_path": "/iiI1YU8akLYWdWuX1qHuMYPvSHC.jpg",
        "popularity": 192.935,
        "vote_average": 8.434,
        "vote_count": 1862,
        "number_of_seasons": 11,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c547"
        },
        "name": "American Horror Story",
        "first_air_date": {
          "$date": {
            "$numberLong": "1317772800000"
          }
        },
        "original_language": "en",
        "overview": "An anthology horror drama series centering on different characters and locations, including a house with a murderous past, an asylum, a witch coven, a freak show, a hotel, a farmhouse in Roanoke, a cult, the apocalypse and a summer camp.",
        "poster_path": "/tiuzjuzalHj377XER1sfq7XQEIT.jpg",
        "popularity": 188.355,
        "vote_average": 8.153,
        "vote_count": 4904,
        "number_of_seasons": 11,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c548"
        },
        "name": "Midsomer Murders",
        "first_air_date": {
          "$date": {
            "$numberLong": "859075200000"
          }
        },
        "original_language": "en",
        "overview": "The peacefulness of the Midsomer community is shattered by violent crimes, suspects are placed under suspicion, and it is up to a veteran DCI and his young sergeant to calmly and diligently eliminate the innocent and ruthlessly pursue the guilty. ",
        "poster_path": "/pz7tsWxe0TTdfJnWPjZAEnrSl5M.jpg",
        "popularity": 184.031,
        "vote_average": 7.608,
        "vote_count": 213,
        "number_of_seasons": 23,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c549"
        },
        "name": "Regular Show",
        "first_air_date": {
          "$date": {
            "$numberLong": "1283731200000"
          }
        },
        "original_language": "en",
        "overview": "Two bored groundskeepers, Mordecai (a six-foot-tall blue jay) and Rigby (a hyperactive raccoon) are best friends who spend their days trying to entertain themselves by any means necessary, much to the displeasure of their boss. Their everyday pursuits often lead to things spiraling out of control and into the surreal.",
        "poster_path": "/mS5SLxMYcKfUxA0utBSR5MOAWWr.jpg",
        "popularity": 182.701,
        "vote_average": 8.7,
        "vote_count": 1624,
        "number_of_seasons": 8,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c54a"
        },
        "name": "Tom Clancy's Jack Ryan",
        "first_air_date": {
          "$date": {
            "$numberLong": "1535587200000"
          }
        },
        "original_language": "en",
        "overview": "When CIA analyst Jack Ryan stumbles upon a suspicious series of bank transfers his search for answers pulls him from the safety of his desk job and catapults him into a deadly game of cat and mouse throughout Europe and the Middle East, with a rising terrorist figurehead preparing for a massive attack against the US and her allies.",
        "poster_path": "/z8yXhmNmc54TsMK2Ig4V4SHdkOX.jpg",
        "popularity": 180.618,
        "vote_average": 7.698,
        "vote_count": 991,
        "number_of_seasons": 4,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f8"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c54b"
        },
        "name": "Futurama",
        "first_air_date": {
          "$date": {
            "$numberLong": "922579200000"
          }
        },
        "original_language": "en",
        "overview": "The adventures of a late-20th-century New York City pizza delivery boy, Philip J. Fry, who, after being unwittingly cryogenically frozen for one thousand years, finds employment at Planet Express, an interplanetary delivery company in the retro-futuristic 31st century.",
        "poster_path": "/k5e8kAq9jpaSmgvFM10su5LXGFR.jpg",
        "popularity": 178.409,
        "vote_average": 8.389,
        "vote_count": 2530,
        "number_of_seasons": 7,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c54c"
        },
        "name": "Hawaii Five-0",
        "first_air_date": {
          "$date": {
            "$numberLong": "1284940800000"
          }
        },
        "original_language": "en",
        "overview": "Steve McGarrett returns home to Oahu, in order to find his father's killer. The governor offers him the chance to run his own task force (Five-0). Steve's team is joined by Chin Ho Kelly, Danny \"Danno\" Williams, and Kono Kalakaua.",
        "poster_path": "/sIdCKlmM2nU4akIvFQaAIiU8YES.jpg",
        "popularity": 177.976,
        "vote_average": 7.684,
        "vote_count": 1430,
        "number_of_seasons": 10,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c54d"
        },
        "name": "La Brea",
        "first_air_date": {
          "$date": {
            "$numberLong": "1632787200000"
          }
        },
        "original_language": "en",
        "overview": "An epic adventure begins when a massive sinkhole opens in the middle of Los Angeles, pulling hundreds of people and buildings into its depths. Those who fell in find themselves in a mysterious and dangerous primeval land, where they have no choice but to band together to survive. Meanwhile, the rest of the world desperately seeks to understand what happened. In the search for answers, one family torn apart by this disaster will have to unlock the secrets of this inexplicable event to find a way back to each other.",
        "poster_path": "/wEo5pzSZ3MF4EzNvY2R1OZNX266.jpg",
        "popularity": 177.963,
        "vote_average": 7.394,
        "vote_count": 921,
        "number_of_seasons": 2,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c54e"
        },
        "name": "Cobra Kai",
        "first_air_date": {
          "$date": {
            "$numberLong": "1525219200000"
          }
        },
        "original_language": "en",
        "overview": "This Karate Kid sequel series picks up 30 years after the events of the 1984 All Valley Karate Tournament and finds Johnny Lawrence on the hunt for redemption by reopening the infamous Cobra Kai karate dojo. This reignites his old rivalry with the successful Daniel LaRusso, who has been working to maintain the balance in his life without mentor Mr. Miyagi.",
        "poster_path": "/m7tG5E1EbywuwTsl6hq990So0Bx.jpg",
        "popularity": 177.107,
        "vote_average": 8.215,
        "vote_count": 5407,
        "number_of_seasons": 5,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c54f"
        },
        "name": "Murdoch Mysteries",
        "first_air_date": {
          "$date": {
            "$numberLong": "1201132800000"
          }
        },
        "original_language": "en",
        "overview": "A Victorian-era Toronto detective uses then-cutting edge forensic techniques to solve crimes, with the assistance of a female coroner who is also struggling for recognition in the face of tradition, based on the books by Maureen Jennings.",
        "poster_path": "/oDeViEDiqQtIaqIaxIQZgmxMgBz.jpg",
        "popularity": 174.835,
        "vote_average": 7.7,
        "vote_count": 201,
        "number_of_seasons": 16,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c550"
        },
        "name": "Prison Break",
        "first_air_date": {
          "$date": {
            "$numberLong": "1125273600000"
          }
        },
        "original_language": "en",
        "overview": "Due to a political conspiracy, an innocent man is sent to death row and his only hope is his brother, who makes it his mission to deliberately get himself sent to the same prison in order to break the both of them out, from the inside out.",
        "poster_path": "/5E1BhkCgjLBlqx557Z5yzcN0i88.jpg",
        "popularity": 174.313,
        "vote_average": 8.085,
        "vote_count": 4120,
        "number_of_seasons": 5,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c551"
        },
        "name": "Young Sheldon",
        "first_air_date": {
          "$date": {
            "$numberLong": "1506297600000"
          }
        },
        "original_language": "en",
        "overview": "The early life of child genius Sheldon Cooper, later seen in The Big Bang Theory.",
        "poster_path": "/5Gf83qYgLY8Qivn7jpv5nxxZPu6.jpg",
        "popularity": 172.925,
        "vote_average": 8.062,
        "vote_count": 1894,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c552"
        },
        "name": "The Sopranos",
        "first_air_date": {
          "$date": {
            "$numberLong": "915926400000"
          }
        },
        "original_language": "en",
        "overview": "The story of New Jersey-based Italian-American mobster Tony Soprano and the difficulties he faces as he tries to balance the conflicting requirements of his home life and the criminal organization he heads. Those difficulties are often highlighted through his ongoing professional relationship with psychiatrist Jennifer Melfi. The show features Tony's family members and Mafia associates in prominent roles and story arcs, most notably his wife Carmela and his cousin and protégé Christopher Moltisanti.",
        "poster_path": "/u7dlARwP2zsqHaMNL5HtHhaEPea.jpg",
        "popularity": 172.467,
        "vote_average": 8.583,
        "vote_count": 2008,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c553"
        },
        "name": "S.W.A.T.",
        "first_air_date": {
          "$date": {
            "$numberLong": "1509580800000"
          }
        },
        "original_language": "en",
        "overview": "A locally born and bred S.W.A.T. lieutenant is torn between loyalty to the streets and duty to his fellow officers when he's tasked to run a highly-trained unit that's the last stop for solving crimes in Los Angeles.",
        "poster_path": "/7Bttz4hEspKlpU0Me57dkHNR3nf.jpg",
        "popularity": 171.787,
        "vote_average": 8.112,
        "vote_count": 1087,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c554"
        },
        "name": "Star Wars: Andor",
        "first_air_date": {
          "$date": {
            "$numberLong": "1663718400000"
          }
        },
        "original_language": "en",
        "overview": "The tale of the burgeoning rebellion against the Empire and how people and planets became involved. In an era filled with danger, deception and intrigue, Cassian Andor embarks on the path that is destined to turn him into a rebel hero.",
        "poster_path": "/59SVNwLfoMnZPPB6ukW6dlPxAdI.jpg",
        "popularity": 170.734,
        "vote_average": 8.13,
        "vote_count": 471,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f8"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c555"
        },
        "name": "Grimm",
        "first_air_date": {
          "$date": {
            "$numberLong": "1319760000000"
          }
        },
        "original_language": "en",
        "overview": "After Portland homicide detective Nick Burkhardt discovers he's descended from an elite line of criminal profilers known as \"Grimms,\" he increasingly finds his responsibilities as a detective at odds with his new responsibilities as a Grimm.",
        "poster_path": "/iOptnt1QHi6bIHmOq6adnZTV0bU.jpg",
        "popularity": 170.409,
        "vote_average": 8.273,
        "vote_count": 2688,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c556"
        },
        "name": "Inside Job",
        "first_air_date": {
          "$date": {
            "$numberLong": "1634860800000"
          }
        },
        "original_language": "en",
        "overview": "For employees of the Deep State, conspiracies aren't just theories — they're fact. And keeping them a secret is a full-time job.",
        "poster_path": "/qwJUDMJ4i3KBYjeUFK9Js87iJEa.jpg",
        "popularity": 170.079,
        "vote_average": 8.206,
        "vote_count": 509,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c557"
        },
        "name": "Malcolm in the Middle",
        "first_air_date": {
          "$date": {
            "$numberLong": "947376000000"
          }
        },
        "original_language": "en",
        "overview": "A gifted young teen tries to survive life with his dimwitted, dysfunctional family.",
        "poster_path": "/ckLLIsNy3Z0Go1PYHA2PHzVymUA.jpg",
        "popularity": 169.919,
        "vote_average": 8.5,
        "vote_count": 3500,
        "number_of_seasons": 7,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f0"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c558"
        },
        "name": "The Sinner",
        "first_air_date": {
          "$date": {
            "$numberLong": "1501632000000"
          }
        },
        "original_language": "en",
        "overview": "In a small New York town, a haunted detective hunts for answers about perplexing crimes while wrestling with his own demons.",
        "poster_path": "/rmibFGdqOe0kKKhPls0jVOdZCWw.jpg",
        "popularity": 168.565,
        "vote_average": 7.452,
        "vote_count": 808,
        "number_of_seasons": 4,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c559"
        },
        "name": "The Rookie",
        "first_air_date": {
          "$date": {
            "$numberLong": "1539648000000"
          }
        },
        "original_language": "en",
        "overview": "Starting over isn’t easy, especially for small-town guy John Nolan who, after a life-altering incident, is pursuing his dream of being an LAPD officer. As the force’s oldest rookie, he’s met with skepticism from some higher-ups who see him as just a walking midlife crisis.",
        "poster_path": "/gSGj4zhuFllpZEkHGdsBMV2BGsq.jpg",
        "popularity": 166.015,
        "vote_average": 8.205,
        "vote_count": 1088,
        "number_of_seasons": 5,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c55a"
        },
        "name": "That '70s Show",
        "first_air_date": {
          "$date": {
            "$numberLong": "903830400000"
          }
        },
        "original_language": "en",
        "overview": "Crank up the 8-track and flash back to a time when platform shoes and puka shells were all the rage in this hilarious retro-sitcom. For Eric, Kelso, Jackie, Hyde, Donna and Fez, a group of high school teens who spend most of their time hanging out in Eric’s basement, life in the ‘70s isn’t always so groovy. But between trying to figure out the meaning of life, avoiding their parents, and dealing with out-of-control hormones, they’ve learned one thing for sure: they’ll always get by with a little help from their friends.",
        "poster_path": "/laEZvTqM80UaplUaDSCCbWhlyEV.jpg",
        "popularity": 163.318,
        "vote_average": 7.963,
        "vote_count": 1105,
        "number_of_seasons": 8,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ec"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f0"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c55b"
        },
        "name": "Stargate SG-1",
        "first_air_date": {
          "$date": {
            "$numberLong": "869961600000"
          }
        },
        "original_language": "en",
        "overview": "The story of Stargate SG-1 begins about a year after the events of the feature film, when the United States government learns that an ancient alien device called the Stargate can access a network of such devices on a multitude of planets. SG-1 is an elite Air Force special operations team, one of more than two dozen teams from Earth who explore the galaxy and defend against alien threats such as the Goa'uld, Replicators, and the Ori.",
        "poster_path": "/rst5xc4f7v1KiDiQjzDiZqLtBpl.jpg",
        "popularity": 162.597,
        "vote_average": 8.249,
        "vote_count": 1240,
        "number_of_seasons": 10,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ea"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f2"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c55c"
        },
        "name": "Peppa Pig",
        "first_air_date": {
          "$date": {
            "$numberLong": "1085961600000"
          }
        },
        "original_language": "en",
        "overview": "Peppa Pig is an energetic piggy who lives with Mummy, Daddy, and little brother George. She loves to jump in mud puddles and make loud snorting noises.",
        "poster_path": "/ycf1ZqisXs8ZCGmw0reD1pI2Zlp.jpg",
        "popularity": 161.981,
        "vote_average": 6.638,
        "vote_count": 654,
        "number_of_seasons": 7,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4eb"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4f1"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c55d"
        },
        "name": "Crime Scene: The Texas Killing Fields",
        "first_air_date": {
          "$date": {
            "$numberLong": "1669680000000"
          }
        },
        "original_language": "en",
        "overview": "An overgrown field and a stretch of highway connect a series of grisly murders spanning several decades as grieving families search for answers.",
        "poster_path": "/h3WOQ5IxMaIIjiNO7Kb7em9ndRc.jpg",
        "popularity": 159.917,
        "vote_average": 6.096,
        "vote_count": 26,
        "number_of_seasons": 1,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4ee"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ed"
          }
        ],
        "__v": 0
      },{
        "_id": {
          "$oid": "63b336f73210e1b92b48c55e"
        },
        "name": "Teen Wolf",
        "first_air_date": {
          "$date": {
            "$numberLong": "1307232000000"
          }
        },
        "original_language": "en",
        "overview": "Scott McCall, a high school student living in the town of Beacon Hills has his life drastically changed when he's bitten by a werewolf, becoming one himself. He must henceforth learn to balance his problematic new identity with his day-to-day teenage life. The following characters are instrumental to his struggle: Stiles, his best friend; Allison, his love interest who comes from a family of werewolf hunters; and Derek, a mysterious werewolf with a dark past. Throughout the series, he strives to keep his loved ones safe while maintaining normal relationships with them.",
        "poster_path": "/vY2vfAskJTiWsQSv6bdbNCQhPLm.jpg",
        "popularity": 159.35,
        "vote_average": 8.596,
        "vote_count": 3541,
        "number_of_seasons": 6,
        "genre_ids": [
          {
            "$oid": "63b336ef3210e1b92b48c4f5"
          },
          {
            "$oid": "63b336ef3210e1b92b48c4ef"
          }
        ],
        "__v": 0
      }]
    res.send(series);

});


// app.get('/genres', async (req, res) => {

// });


// app.get('/series/:id');

// app.get('/series/filters');

// app.get('/series/commonAmongFollowing');

// app.get('/series/watched');

// app.get('/series/topRated');

// app.get('/series/popular');

module.exports = app;