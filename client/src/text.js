import { MessageCircleHeart } from 'lucide-react';
import { PersonStanding } from 'lucide-react';
import { Webhook } from 'lucide-react';
import batman from './assets/batman.jpg'
import trump from './assets/trump.png'
import queen from './assets/queen.png'



export const homeCardtext = [
    {
        id:1,
        title: 'Interact with Real-time AI Chat',
        text: 'Chat instantly with AI characters, designed to respond like real people.',
        icon: ''
    },
    {
        id:2,
        title: 'Interactive Personalities',
        text: 'Engage in discussions with a leadership perspective, experience historical insights from a regal point of view and Dive into conversations with a vigilant detective.',
        icon: ''
    },
    {
        id:3,
        title: 'Seamless Experience',
        text: 'Enjoy smooth interactions tailored to your preferences.',
        icon:   ''
    },
]

export const characterData = [
    {
      id: 1,
      name: "Mr. Donald Trump",
      image: trump,
      message:
        "I bring bold perspectives and a unique approach to any conversation. Ask me anything about business, leadership, or world affairs!",
    },
    {
      id: 2,
      name: "Her Majesty Queen Elizabeth II",
      image: queen,
      message:
        "With a lifetime of wisdom and poise, I’m here to share insights on history, tradition, and diplomacy. Let’s have a dignified chat!",
    },
    {
      id: 3,
      name: "Batman",
      image: batman,
      message:
        "Justice, strategy, and a hint of mystery—I’m here to help you tackle challenges with a hero’s mindset. The Bat-signal is always on!",
    },
  ];
