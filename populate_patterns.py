import os
import json
from datetime import datetime

def create_directory_structure():
    """Create directories for speech documents"""
    base_dir = "speech_documents"
    os.makedirs(base_dir, exist_ok=True)
    
    voice_actors = ["trump", "obama", "modi", "srk", "technoblade", "chrispratt"]
    for actor in voice_actors:
        os.makedirs(os.path.join(base_dir, actor), exist_ok=True)
    
    return base_dir

def generate_trump_documents(base_dir):
    """Generate Donald Trump speech documents"""
    trump_dir = os.path.join(base_dir, "trump")
    
    # Campaign Speech 2016
    with open(os.path.join(trump_dir, "campaign_speech_2016.txt"), "w", encoding="utf-8") as f:
        f.write("""DONALD TRUMP CAMPAIGN SPEECH - 2016

Folks, let me tell you something. We're going to make America great again. We're going to make America great again. Nobody knows this better than me. Nobody. Believe me.

The system is rigged. It's absolutely rigged. The media doesn't want to talk about it, but I'm telling you, it's rigged. We have the best people, the smartest people, and we're going to do things that nobody thought possible.

Our country is in serious trouble. We have people coming in, and we don't know who they are. We don't know where they're from. We don't know what they're doing. It's a disaster. It's a total disaster.

But I'm going to fix it. I'm going to fix it like nobody's ever fixed it before. We're going to build a wall, and Mexico is going to pay for it. They don't know it yet, but they're going to pay for it.

The economy is terrible. Jobs are leaving. Companies are leaving. But I'm going to bring them back. I'm going to bring them all back. We're going to have the best economy ever. Ever.

Thank you, folks. Thank you. We're going to win so much, you're going to be so sick of winning. You're going to say, 'Mr. President, please, we can't take it anymore.' And I'm going to say, 'No, we're going to keep winning.'""")

    # White House Press Briefing
    with open(os.path.join(trump_dir, "press_briefing_2017.txt"), "w", encoding="utf-8") as f:
        f.write("""DONALD TRUMP PRESS BRIEFING - 2017

Good morning, everybody. Good morning. We've had a tremendous day. Tremendous. The stock market is doing great. The economy is doing great. We're creating jobs like nobody's ever seen before.

The fake news media, they don't want to report the good news. They only want to report the bad news. But the numbers don't lie. The numbers are incredible. We're doing better than anybody thought possible.

I had a great meeting with the generals today. Great meeting. They're the best. They're absolutely the best. We're going to rebuild our military. We're going to make it stronger than ever before.

The border situation is a disaster. It's a total disaster. But we're fixing it. We're building the wall. It's going to be beautiful. It's going to be the best wall ever built. Ever.

I want to thank all the great people who voted for me. You're the best. You're absolutely the best. We're going to keep America great. We're going to keep winning.

Thank you, everybody. Thank you.""")

    # Twitter Style Posts
    with open(os.path.join(trump_dir, "twitter_style.txt"), "w", encoding="utf-8") as f:
        f.write("""DONALD TRUMP TWITTER STYLE POSTS

The Fake News Media is working overtime to cover up the tremendous success we're having. Sad!

Nobody knows the system better than me, which is why I alone can fix it. Believe me!

The Radical Left Democrats are destroying our country. We need to Make America Great Again!

Just met with the best people. They're incredible. The best. Nobody does it better than us.

The economy is BOOMING! Jobs are coming back. Companies are coming back. We're winning big time!

The Witch Hunt continues. The Mueller investigation was a total disaster. No collusion, no obstruction. Witch Hunt!

We're building the wall and Mexico will pay for it. They don't know it yet, but they will. Mark my words!

The stock market is setting records. The economy is the best it's ever been. Thank you to all the great Americans!

The Democrats are in total disarray. They have no message, no plan, no nothing. We're going to win big in 2020!

America First! America First! We're putting America First like never before!""")

def generate_obama_documents(base_dir):
    """Generate Barack Obama speech documents"""
    obama_dir = os.path.join(base_dir, "obama")
    
    # Inaugural Address
    with open(os.path.join(obama_dir, "inaugural_address_2009.txt"), "w", encoding="utf-8") as f:
        f.write("""BARACK OBAMA INAUGURAL ADDRESS - 2009

My fellow citizens, I stand here today humbled by the task before us, grateful for the trust you have bestowed, mindful of the sacrifices borne by our ancestors.

I thank President Bush for his service to our nation, as well as the generosity and cooperation he has shown throughout this transition.

Forty-four Americans have now taken the presidential oath. The words have been spoken during rising tides of prosperity and the still waters of peace. Yet, every so often the oath is taken amidst gathering clouds and raging storms.

At these moments, America has carried on not simply because of the skill or vision of those in high office, but because We the People have remained faithful to the ideals of our forbearers, and true to our founding documents.

So it has been. So it must be with this generation of Americans.

That we are in the midst of crisis is now well understood. Our nation is at war, against a far-reaching network of violence and hatred. Our economy is badly weakened, a consequence of greed and irresponsibility on the part of some, but also our collective failure to make hard choices and prepare the nation for a new age.

Homes have been lost; jobs shed; businesses shuttered. Our health care is too costly; our schools fail too many; and each day brings further evidence that the ways we use energy strengthen our adversaries and threaten our planet.

These are the indicators of crisis, subject to data and statistics. Less measurable but no less profound is a sapping of confidence across our land - a nagging fear that America's decline is inevitable, and that the next generation must lower its sights.

Today I say to you that the challenges we face are real. They are serious and they are many. They will not be met easily or in a short span of time. But know this, America - they will be met.

On this day, we gather because we have chosen hope over fear, unity of purpose over conflict and discord.

On this day, we come to proclaim an end to the petty grievances and false promises, the recriminations and worn out dogmas, that for far too long have strangled our politics.

We remain a young nation, but in the words of Scripture, the time has come to set aside childish things. The time has come to reaffirm our enduring spirit; to choose our better history; to carry forward that precious gift, that noble idea, passed on from generation to generation: the God-given promise that all are equal, all are free, and all deserve a chance to pursue their full measure of happiness.""")

    # Nobel Peace Prize Speech
    with open(os.path.join(obama_dir, "nobel_peace_prize.txt"), "w", encoding="utf-8") as f:
        f.write("""BARACK OBAMA NOBEL PEACE PRIZE SPEECH - 2009

Your Majesties, Your Royal Highnesses, distinguished members of the Norwegian Nobel Committee, citizens of America, and citizens of the world:

I receive this honor with deep gratitude and great humility. It is an award that speaks to our highest aspirations - that for all the cruelty and hardship of our world, we are not mere prisoners of fate. Our actions matter, and can bend history in the direction of justice.

And yet I would be remiss if I did not acknowledge the considerable controversy that your generous decision has generated. In part, this is because I am at the beginning, and not the end, of my labors on the world stage. Compared to some of the giants of history who've received this prize - Schweitzer and King; Marshall and Mandela - my accomplishments are slight.

And then there's the fact that I am the Commander-in-Chief of the military of a nation in the midst of two wars. One of these wars is winding down. The other is a conflict that America did not seek; one in which we are joined by 42 other countries - including Norway - in an effort to defend ourselves and all nations from further attacks.

Still, we are at war, and I'm responsible for the deployment of thousands of young Americans to battle in a distant land. Some will kill, and some will be killed. And so I come here with an acute sense of the costs of armed conflict - filled with difficult questions about the relationship between war and peace, and our effort to replace one with the other.

Now these questions are not new. War, in one form or another, appeared with the first man. At the dawn of history, its morality was not questioned; it was simply a fact, like drought or disease - the manner in which tribes and then civilizations sought power and settled their differences.

And over time, as codes of law sought to control violence within groups, so did philosophers and clerics and statesmen seek to regulate the destructive power of war. The concept of a "just war" emerged, suggesting that war is justified only when certain conditions were met: if it is waged as a last resort or in self-defense; if the force used is proportional; and if, whenever possible, civilians are spared from violence.

Of course, we know that for most of history, this concept of "just war" was rarely observed. The capacity of human beings to think up new ways to kill one another proved inexhaustible, as did our capacity to exempt from mercy those who look different or pray to a different God. Wars between armies gave way to wars between nations - total wars in which the distinction between combatant and civilian became blurred.

In the span of 30 years, such carnage would twice engulf this continent. And while it's hard to conceive of a cause more just than the defeat of the Third Reich and the Axis powers, World War II was a conflict in which the total number of civilians who died exceeded the number of soldiers who perished.

In the wake of such destruction, and with the advent of the nuclear age, it became clear to victor and vanquished alike that the world needed institutions to prevent another world war. And so, a quarter century after the United States Senate rejected the League of Nations - an idea for which Woodrow Wilson received this prize - America led the world in constructing an architecture to keep the peace: a Marshall Plan and a United Nations, mechanisms to govern the waging of war, treaties to protect human rights, prevent genocide, restrict the most dangerous weapons.

In many ways, these efforts succeeded. Yes, terrible wars have been fought, and atrocities committed. But there has been no Third World War. The Cold War ended with jubilant crowds dismantling a wall. Commerce has stitched much of the world together. Billions have been lifted from poverty. The ideals of liberty and self-determination, equality and the rule of law have haltingly advanced. We are the heirs of the fortitude and foresight of generations past, and it is a legacy for which my own country is rightfully proud.""")

    # Dreams from My Father Excerpt
    with open(os.path.join(obama_dir, "dreams_from_my_father.txt"), "w", encoding="utf-8") as f:
        f.write("""BARACK OBAMA - DREAMS FROM MY FATHER EXCERPT

A few months after my twenty-first birthday, a stranger called to give me the news. I was living in New York at the time, on Ninety-fourth between Second and First, part of that unnamed, shifting border between East Harlem and the rest of Manhattan. It was an uninviting block, treeless and barren, lined with soot-colored walk-ups that cast heavy shadows for most of the day. The apartment was small, with slanting floors and irregular heat and a buzzer downstairs that didn't work, so that visitors had to call ahead from a pay phone at the corner gas station, where a black Doberman the size of a wolf paced through the night in vigilant patrol, its jaws clamped around an empty beer bottle.

I was working as a research assistant at the time, trying to save money for graduate school. My office was in the financial district, and every morning I would wake up at five o'clock to beat the crowd, dressing quietly in the dark while my roommate, Sadik, lay sleeping in the other bed. I would put on coffee and maybe a slice of toast, then take the elevator downstairs to meet the predawn chill. The streets were empty, the office towers dark; I could hear my footsteps echo against the pavement. At the subway station, I would wait for the first train of the day, then take it to the end of the line, where I would board another train that took me back to the center of the city. The office was on the twenty-third floor, and from my desk I could see across the East River to Brooklyn, the bridge's cables like the strings of a giant harp, the river's surface a shifting mirror of light. I would work there until evening, then reverse my route, arriving home in time to watch the late news and maybe read a book before bed.

It was a lonely time for me, a time when I was trying to find my place in the world. I had graduated from college two years before, and since then I had been working odd jobs, trying to figure out what I wanted to do with my life. I had thought about law school, but the idea of spending three more years in school, then working in a law firm, seemed too conventional, too predictable. I had thought about writing, but I wasn't sure I had anything to say. I had thought about politics, but the idea of running for office seemed too grandiose, too presumptuous.

And so I had drifted, taking whatever work came my way, living in cheap apartments, reading books, listening to music, trying to understand who I was and where I came from. I had always been interested in my family's history, but I had never really explored it. My father was a mystery to me, a figure from a distant land who had left when I was two years old. I had only a few memories of him, and most of those were probably imagined. I knew that he was from Kenya, that he had studied in America, that he had returned to Africa when I was still a child. But beyond that, I knew very little.

My mother had told me stories about him, of course. She had told me about his intelligence, his charm, his ambition. She had told me about the way he could make people laugh, the way he could make them think. She had told me about his dreams for Kenya, his hopes for Africa. But these were stories, filtered through her memory and her love for him. They were not the man himself.

And so when the stranger called to tell me that my father was dead, I felt nothing. I had never really known him, and so I could not really mourn him. I thanked the caller for the information, hung up the phone, and went back to work. But later that night, as I lay in bed, I began to think about what I had lost. Not the man himself, but the possibility of knowing him, of understanding him, of learning from him. I began to think about all the questions I would never be able to ask him, all the stories I would never be able to hear from him, all the wisdom he might have been able to share with me.

And I began to think about my own identity, about who I was and where I came from. I had always thought of myself as an American, but now I began to wonder what that meant. I had always thought of myself as black, but now I began to wonder what that meant too. I had always thought of myself as the son of my mother, but now I began to wonder about my father's influence on who I was becoming.

It was then that I decided to write this book. Not as a biography of my father, but as a way of understanding myself. I wanted to explore the questions that his death had raised in my mind. I wanted to understand how his life had shaped mine, even though I had never really known him. I wanted to understand how the choices he had made, the dreams he had pursued, the failures he had experienced, had all contributed to the person I was becoming.

This book is the result of that exploration. It is not a complete story, of course. There are gaps in my knowledge, questions that remain unanswered, mysteries that may never be solved. But it is the best I can do with what I have, and I hope that it will help others who are struggling with similar questions about their own identity and their own place in the world.""")

def generate_modi_documents(base_dir):
    """Generate Narendra Modi speech documents"""
    modi_dir = os.path.join(base_dir, "modi")
    
    # Independence Day Speech
    with open(os.path.join(modi_dir, "independence_day_speech.txt"), "w", encoding="utf-8") as f:
        f.write("""NARENDRA MODI INDEPENDENCE DAY SPEECH - 2020

My dear countrymen, my dear brothers and sisters, my dear children,

Today, on this sacred day of Independence, I extend my greetings to all of you. This is a day of pride for every Indian. This is a day when we remember the sacrifices of our freedom fighters. This is a day when we renew our pledge to build a new India.

From the ramparts of the Red Fort, I can see the tricolor flying high. This flag is not just a piece of cloth. It is the symbol of our unity, our integrity, our sovereignty. It is the symbol of our democracy, our constitution, our values.

My dear countrymen, the last few months have been challenging for the entire world. The coronavirus pandemic has affected every country, every society, every family. But India has shown the world how to fight this challenge with determination and discipline.

We have shown the world that India can take care of its citizens. We have shown the world that India can provide food to its poor. We have shown the world that India can provide healthcare to its people. We have shown the world that India can provide financial assistance to its farmers, its workers, its small businessmen.

My dear countrymen, today I want to tell you about the new India that we are building. A new India where every citizen has access to basic facilities. A new India where every farmer gets the right price for his produce. A new India where every worker gets employment. A new India where every student gets quality education. A new India where every patient gets quality healthcare.

We are working towards making India self-reliant. We are working towards making India a global manufacturing hub. We are working towards making India a global innovation center. We are working towards making India a global knowledge center.

My dear countrymen, the world is looking at India with hope. The world is looking at India with respect. The world is looking at India with admiration. This is because of your hard work, your discipline, your determination.

Together we will build a new India. Together we will achieve great things. Together we will make India proud. Together we will make the world proud.

Jai Hind! Jai Bharat!""")

    # Mann Ki Baat Radio Address
    with open(os.path.join(modi_dir, "mann_ki_baat.txt"), "w", encoding="utf-8") as f:
        f.write("""NARENDRA MODI MANN KI BAAT RADIO ADDRESS

My dear countrymen, Namaskar!

Today, through Mann Ki Baat, I want to share something very important with you. Something that is close to my heart. Something that affects every Indian family.

My dear brothers and sisters, you know that I always try to connect with you through this program. I try to understand your concerns, your aspirations, your dreams. I try to share my thoughts with you, my vision for India.

Today, I want to talk about something that is very important for our country's future. I want to talk about education. Education is the foundation of any society. Education is the key to progress. Education is the path to prosperity.

My dear countrymen, in the last few years, we have made tremendous progress in the field of education. We have built new schools, new colleges, new universities. We have provided scholarships to millions of students. We have made education accessible to every child, every youth.

But we need to do more. We need to focus on quality education. We need to focus on skill development. We need to focus on innovation. We need to focus on research.

My dear brothers and sisters, today I want to tell you about a new initiative that we are launching. An initiative that will transform education in India. An initiative that will make India a global education hub.

We are launching the National Education Policy. This policy will focus on holistic development. This policy will focus on skill development. This policy will focus on innovation. This policy will focus on research.

My dear countrymen, this policy is not just a document. It is a roadmap for the future. It is a vision for the next generation. It is a commitment to every student, every teacher, every parent.

I want to tell you that this policy has been prepared after extensive consultations. We have consulted with experts, with teachers, with students, with parents. We have taken into account the best practices from around the world.

My dear brothers and sisters, I want to assure you that this policy will be implemented with full commitment. We will ensure that every child gets quality education. We will ensure that every youth gets the skills they need. We will ensure that every student gets the opportunity to excel.

Together we will build a new India. Together we will create a new future. Together we will achieve great things.

Thank you, my dear countrymen. Thank you for your support. Thank you for your trust.

Jai Hind!""")

def generate_srk_documents(base_dir):
    """Generate Shah Rukh Khan speech documents"""
    srk_dir = os.path.join(base_dir, "srk")
    
    # TED Talk Excerpt
    with open(os.path.join(srk_dir, "ted_talk.txt"), "w", encoding="utf-8") as f:
        f.write("""SHAH RUKH KHAN TED TALK - "THOUGHTS ON HUMANITY, FAME AND LOVE"

Thank you. Thank you so much. It's wonderful to be here. It's wonderful to be anywhere, actually.

I've been a movie star for 25 years now, and I've been thinking about what I could share with you that would be meaningful. And I thought, maybe I should share with you the three lessons that I've learned about being a movie star, and maybe they apply to all of us.

The first lesson is: success is not a good teacher. Failure is a great teacher. I've been successful for 25 years, and I can tell you, success makes you stupid. It makes you think you know everything. It makes you think you can do no wrong. It makes you think you're invincible.

But failure, failure teaches you humility. Failure teaches you that you're not perfect. Failure teaches you that you need to work harder. Failure teaches you that you need to be better.

The second lesson is: love is not about finding the perfect person. It's about seeing an imperfect person perfectly. I've been married for 25 years, and I can tell you, my wife is not perfect. I'm not perfect either. But we see each other perfectly. We accept each other's flaws. We love each other despite our imperfections.

Love is not about finding someone who completes you. Love is about finding someone who accepts you completely. Love is about finding someone who loves you for who you are, not for who they want you to be.

The third lesson is: destiny is not a matter of chance. It's a matter of choice. I was not born to be a movie star. I was born in a middle-class family in Delhi. My father was a freedom fighter. My mother was a magistrate. They wanted me to be a lawyer or a doctor or an engineer.

But I chose to be an actor. I chose to follow my dreams. I chose to take risks. I chose to fail. I chose to learn from my failures. I chose to keep trying.

And that's what destiny is. Destiny is not something that happens to you. Destiny is something that you create. Destiny is something that you choose. Destiny is something that you work for.

My dear friends, I want to tell you something. I want to tell you that you are all movie stars. You are all heroes. You are all legends. You just don't know it yet.

You have the power to change the world. You have the power to make a difference. You have the power to inspire others. You have the power to love. You have the power to dream. You have the power to choose your destiny.

So go out there and be the hero of your own story. Go out there and make your dreams come true. Go out there and change the world.

Thank you. Thank you so much. God bless you all.""")

    # Award Acceptance Speech
    with open(os.path.join(srk_dir, "award_speech.txt"), "w", encoding="utf-8") as f:
        f.write("""SHAH RUKH KHAN AWARD ACCEPTANCE SPEECH

Thank you. Thank you so much. This is truly overwhelming. This is truly humbling. This is truly special.

You know, when I started acting 25 years ago, I never thought I would be standing here today. I never thought I would be receiving this honor. I never thought I would be recognized for my work.

I was just a boy from Delhi who loved movies. I was just a boy who dreamed of being an actor. I was just a boy who wanted to tell stories. I was just a boy who wanted to make people smile.

And here I am today, standing in front of you, receiving this incredible honor. It's amazing how life works. It's amazing how dreams come true. It's amazing how love and hard work can take you places you never imagined.

I want to thank my family. My wife, who has been my rock for 25 years. My children, who have been my inspiration. My parents, who taught me the value of hard work and honesty. My sister, who has always been my biggest supporter.

I want to thank my friends. My friends who have been with me through thick and thin. My friends who have laughed with me and cried with me. My friends who have believed in me when I didn't believe in myself.

I want to thank my fans. My fans who have loved me unconditionally. My fans who have supported me through my ups and downs. My fans who have made me who I am today. My fans who have given me the courage to dream big.

I want to thank the film industry. The directors who gave me opportunities. The producers who believed in me. The writers who wrote beautiful stories. The technicians who made my dreams come true.

But most of all, I want to thank love. Love for cinema. Love for storytelling. Love for acting. Love for making people happy. Love for this incredible journey that I've been on.

You know, they say that love is the most powerful force in the universe. I believe that. I believe that love can conquer all. I believe that love can make the impossible possible. I believe that love can change the world.

And that's what I've tried to do with my work. I've tried to spread love. I've tried to make people smile. I've tried to tell stories that touch the heart. I've tried to create characters that inspire.

I've played kings and commoners. I've played lovers and fighters. I've played heroes and villains. I've played rich and poor. I've played happy and sad. I've played everything in between.

But through all these characters, I've tried to convey one message: love. Love for humanity. Love for life. Love for dreams. Love for hope.

And that's what this award means to me. It's not just recognition for my work. It's recognition for the power of love. It's recognition for the power of dreams. It's recognition for the power of hope.

So thank you. Thank you for this incredible honor. Thank you for believing in me. Thank you for loving me. Thank you for making my dreams come true.

I promise you, I will continue to work hard. I will continue to tell stories. I will continue to spread love. I will continue to make people smile. I will continue to dream big.

Because that's what life is all about. Dreaming big. Working hard. Spreading love. Making a difference.

Thank you. God bless you all.""")

def generate_technoblade_documents(base_dir):
    """Generate Technoblade speech documents"""
    techno_dir = os.path.join(base_dir, "technoblade")
    
    # YouTube Video Script
    with open(os.path.join(techno_dir, "youtube_script.txt"), "w", encoding="utf-8") as f:
        f.write("""TECHNOBLADE YOUTUBE VIDEO SCRIPT

What's up guys, Technoblade here. Today we're going to be doing something absolutely insane. Something that nobody has ever done before. Something that will go down in history as the greatest achievement in Minecraft history.

But first, let me tell you about my day. I woke up this morning, and I was like, 'You know what? I'm going to speedrun Minecraft today.' And then I realized, 'Wait, I'm Technoblade. I don't speedrun. I break speedruns.'

So here's what we're going to do. We're going to start a new world, and we're going to beat the game in record time. But not just any record time. We're going to beat it so fast that the speedrun community will have to create a new category just for us.

Blood for the blood god, skulls for the skull throne. That's my motto. That's my philosophy. That's my way of life.

You see, most people play Minecraft to have fun. I play Minecraft to dominate. I play Minecraft to win. I play Minecraft to prove that I'm the best. Because let's face it, I am the best.

Now, some of you might be thinking, 'Technoblade, you're being a bit arrogant here.' And to that I say, 'You're absolutely right. I am arrogant. But I have every right to be arrogant because I'm the best Minecraft player in the world.'

I'm not a hero. I'm just a guy who's really good at video games. That's it. That's my entire personality. That's my entire identity. I'm just a guy who's really good at video games, and I'm not afraid to admit it.

So let's get started. We're going to spawn in, and immediately we're going to look for a village. Because villages are the key to everything. Villages have beds, villages have food, villages have iron. Villages are basically free resources.

But here's the thing about villages. They're also full of villagers. And villagers are the most annoying creatures in the entire game. They just stand there and make weird noises. They don't do anything useful. They're just there to be annoying.

So what I like to do is, I like to trade with them first, get all the good stuff, and then I like to... well, let's just say they don't need their beds anymore.

Blood for the blood god, skulls for the skull throne. That's how I roll.

Now, some people might say that's a bit harsh. Some people might say that's a bit cruel. Some people might say that's a bit... well, let's just say it's not very nice.

But you know what? I don't care. Because I'm Technoblade, and I do what I want. I'm not here to be nice. I'm not here to be polite. I'm not here to follow the rules. I'm here to win.

And winning means doing whatever it takes to get ahead. Winning means being ruthless. Winning means being efficient. Winning means being the best.

So let's continue with our speedrun. We've got our iron, we've got our food, we've got our beds. Now we need to find a stronghold. Because the stronghold is where the end portal is, and the end portal is how we get to the end, and the end is where the dragon is, and the dragon is what we need to kill to win the game.

But here's the thing about strongholds. They're really hard to find. They're buried deep underground, and they're really rare. Most people spend hours looking for them.

But not me. Because I'm Technoblade, and I have a secret technique. I use ender pearls. Ender pearls point towards the stronghold. It's that simple. It's that easy. It's that obvious.

But most people don't know that. Most people just dig around randomly, hoping to find it. But not me. I'm smarter than that. I'm better than that. I'm Technoblade.

So we throw our ender pearl, and it points us in the right direction. We dig down, and boom, there's the stronghold. Easy. Simple. Efficient.

Blood for the blood god, skulls for the skull throne. That's how you do it.

Now we're in the stronghold, and we need to find the end portal. But here's the thing about end portals. They're really hard to activate. You need twelve end portal frames, and you need to place them in the right pattern.

But not me. Because I'm Technoblade, and I know exactly where to place them. I've done this a thousand times. I could do it in my sleep. I could do it blindfolded. I could do it with one hand tied behind my back.

So we place the frames, we light the portal, and we jump through. We're in the end. We're facing the dragon. We're about to make history.

Blood for the blood god, skulls for the skull throne. This is it. This is the moment. This is where legends are made.

The dragon is huge. The dragon is terrifying. The dragon is the final boss. But not for me. Because I'm Technoblade, and I don't lose. I don't know how to lose. Losing is not in my vocabulary.

So we fight the dragon. We dodge its attacks, we shoot it with arrows, we hit it with our sword. And finally, after what feels like an eternity, the dragon dies.

We've done it. We've beaten the game. We've made history. We've proven that I'm the best Minecraft player in the world.

Blood for the blood god, skulls for the skull throne. Mission accomplished.

Thanks for watching, guys. Don't forget to like and subscribe. And remember, I'm not a hero. I'm just a guy who's really good at video games.""")

    # Stream Highlights
    with open(os.path.join(techno_dir, "stream_highlights.txt"), "w", encoding="utf-8") as f:
        f.write("""TECHNOBLADE STREAM HIGHLIGHTS

[Stream Start]

What's up chat? Technoblade here, back with another stream. Today we're going to be doing something absolutely insane. Something that will blow your minds. Something that will make you question everything you thought you knew about Minecraft.

But first, let me read some donations. Because apparently that's what streamers do. They read donations and act grateful. Well, I'm not grateful. I'm Technoblade. I don't do grateful.

"Thanks for the $5 donation, random person I don't know. I'll spend it on something stupid, probably."

"Thanks for the $10 donation, another random person. I'll use it to buy more Minecraft accounts so I can dominate even more servers."

"Thanks for the $50 donation, rich person. I'll use it to... actually, that's a lot of money. Maybe I should be a bit more grateful. Thanks, rich person. You're not completely terrible."

Blood for the blood god, skulls for the skull throne. That's how I roll.

Now, let's talk about what we're going to do today. We're going to join a public server, and we're going to dominate it. We're going to show everyone who's boss. We're going to prove that I'm the best player on the server.

But here's the thing about public servers. They're full of noobs. They're full of people who don't know how to play. They're full of people who think they're good but are actually terrible.

And that's perfect for me. Because I love destroying noobs. I love showing them how bad they are. I love making them cry. I love making them rage quit.

Blood for the blood god, skulls for the skull throne. That's my philosophy.

So we join the server, and immediately we start looking for players. We find some guy building a house, and we just start attacking him. No warning, no mercy, no hesitation.

The guy is like, "Hey, what are you doing? I'm just building a house!" And I'm like, "I don't care. Blood for the blood god, skulls for the skull throne."

He tries to fight back, but he's terrible. He doesn't know how to PvP. He doesn't know how to dodge. He doesn't know how to block. He's just standing there, taking hits like an idiot.

So I kill him. Easy. Simple. Efficient. That's how I roll.

Then we find another player. This one is a bit better. He actually tries to fight back. He actually tries to dodge. He actually tries to block. But he's still terrible. He's still no match for me.

Because I'm Technoblade, and I'm the best PvP player in the world. I don't lose. I don't know how to lose. Losing is not in my vocabulary.

So I kill him too. Blood for the blood god, skulls for the skull throne.

[Chat is going crazy]

Chat is going crazy. They're all like, "Technoblade is insane!" "Technoblade is the best!" "Technoblade is unstoppable!"

And they're absolutely right. I am insane. I am the best. I am unstoppable.

But you know what? I'm not doing this for the fame. I'm not doing this for the recognition. I'm not doing this for the money. I'm doing this because I love it. I love destroying people. I love being the best. I love proving that I'm unstoppable.

I'm not a hero. I'm just a guy who's really good at video games. That's it. That's my entire personality. That's my entire identity. I'm just a guy who's really good at video games, and I'm not afraid to admit it.

So we continue our rampage. We kill more players. We destroy more bases. We prove that we're the best. We prove that we're unstoppable.

Blood for the blood god, skulls for the skull throne. That's how you do it.

[Stream End]

Thanks for watching, chat. Don't forget to follow and subscribe. And remember, I'm not a hero. I'm just a guy who's really good at video games.

Blood for the blood god, skulls for the skull throne. Until next time.""")

def generate_chrispratt_documents(base_dir):
    """Generate Chris Pratt speech documents"""
    chris_dir = os.path.join(base_dir, "chrispratt")
    
    # Interview Excerpt
    with open(os.path.join(chris_dir, "interview.txt"), "w", encoding="utf-8") as f:
        f.write("""CHRIS PRATT INTERVIEW EXCERPT

You know, it's crazy. It's absolutely crazy. I never thought I'd be here. I never thought I'd be doing this. I never thought I'd be talking to you about being a movie star.

I was just a regular guy from Minnesota. I was just a guy who loved movies. I was just a guy who dreamed of being an actor. I was just a guy who wanted to make people laugh.

And here I am today, talking to you about being in some of the biggest movies ever made. It's insane. It's absolutely insane.

You know, when I first started acting, I was terrible. I was absolutely terrible. I couldn't act my way out of a paper bag. I was just this awkward guy who was trying to be funny, and most of the time, I wasn't.

But I kept trying. I kept working hard. I kept believing in myself. I kept dreaming big. And slowly, very slowly, I started getting better.

And then I got my big break. I got cast in Parks and Recreation, and everything changed. Suddenly, people were laughing at my jokes. Suddenly, people were recognizing me on the street. Suddenly, I was a real actor.

It was amazing. It was absolutely amazing. I couldn't believe it. I still can't believe it sometimes.

And then things just kept getting better. I got cast in Guardians of the Galaxy, and that was a whole different level. That was a Marvel movie. That was a superhero movie. That was the big leagues.

I was playing Star-Lord, this intergalactic outlaw who's kind of a jerk but also kind of lovable. And I was working with these amazing actors and this amazing director, and it was just incredible.

The movie came out, and people loved it. People loved my character. People loved the movie. It was a huge hit. It was absolutely huge.

And then I got cast in Jurassic World, and that was even bigger. That was a Jurassic Park movie. That was one of the most beloved franchises in movie history. And I was going to be the lead.

I was terrified. I was absolutely terrified. I was like, "What if I mess this up? What if I ruin Jurassic Park? What if people hate me?"

But I worked really hard. I trained really hard. I prepared really hard. And when the movie came out, people loved it. People loved my character. People loved the movie. It was another huge hit.

And then I got cast in The Lego Movie, and that was just pure fun. I was playing this little Lego guy who thinks he's the most important person in the world, and it was just hilarious. I had so much fun doing that movie.

And then I got cast in Passengers, and that was a whole different kind of movie. That was a romantic sci-fi movie. That was a serious movie. That was me trying to show that I could do more than just comedy.

And people liked it. People liked my performance. People liked the movie. It wasn't a huge hit, but it was well-received, and that meant a lot to me.

You know, the thing about being an actor is that you never know what's going to happen. You never know which movie is going to be a hit. You never know which performance is going to be well-received. You just have to keep working hard and keep believing in yourself.

And that's what I've done. I've kept working hard. I've kept believing in myself. I've kept dreaming big. And it's worked out pretty well so far.

But you know what? I'm still just a regular guy. I'm still just a guy from Minnesota. I'm still just a guy who loves movies. I'm still just a guy who wants to make people laugh.

I haven't changed. I'm still the same person I was when I started. I'm still humble. I'm still grateful. I'm still amazed by everything that's happened to me.

I'm just a regular guy who got really lucky. That's it. That's my story. That's my journey. I'm just a regular guy who got really lucky, and I'm not afraid to admit it.

You know, people ask me all the time, "What's your secret? How did you make it? What's your advice for aspiring actors?"

And my answer is always the same: work hard, believe in yourself, and never give up. That's it. That's my secret. That's my advice.

Work hard. Believe in yourself. Never give up. And maybe, just maybe, you'll get lucky too.

Because that's what happened to me. I worked hard. I believed in myself. I never gave up. And I got lucky. Really lucky.

And I'm grateful for that luck. I'm grateful for every opportunity I've had. I'm grateful for every person who's helped me along the way. I'm grateful for every fan who's supported me.

I'm just a regular guy who got really lucky, and I'm not going to forget that. I'm not going to take it for granted. I'm not going to act like I'm better than anyone else.

Because I'm not. I'm just a regular guy who got really lucky. That's it. That's my story. That's my journey. That's who I am.

And I'm proud of that. I'm proud of my story. I'm proud of my journey. I'm proud of who I am.

I'm Chris Pratt, and I'm just a regular guy who got really lucky. And I'm not afraid to admit it.""")

    # Award Show Speech
    with open(os.path.join(chris_dir, "award_speech.txt"), "w", encoding="utf-8") as f:
        f.write("""CHRIS PRATT AWARD SHOW SPEECH

Oh my God. Oh my God. This is insane. This is absolutely insane. I can't believe this is happening. I can't believe I'm standing here right now.

You know, when I first started acting, I never thought I'd be here. I never thought I'd be receiving an award. I never thought I'd be recognized for my work. I was just a guy who loved movies and wanted to make people laugh.

And here I am today, standing in front of all of you, receiving this incredible honor. It's amazing. It's absolutely amazing. I'm so grateful. I'm so humbled. I'm so overwhelmed.

I want to thank my family. My wife, who has been my rock through everything. My children, who are my inspiration. My parents, who taught me the value of hard work and honesty. My sister, who has always been my biggest supporter.

I want to thank my friends. My friends who have been with me through thick and thin. My friends who have laughed with me and cried with me. My friends who have believed in me when I didn't believe in myself.

I want to thank my fans. My fans who have loved me unconditionally. My fans who have supported me through my ups and downs. My fans who have made me who I am today. My fans who have given me the courage to dream big.

I want to thank the film industry. The directors who gave me opportunities. The producers who believed in me. The writers who wrote beautiful stories. The technicians who made my dreams come true.

But most of all, I want to thank luck. Because that's what this is. This is luck. I'm just a regular guy who got really lucky. That's it. That's my story. That's my journey.

I'm not the most talented actor in the world. I'm not the most handsome actor in the world. I'm not the most charismatic actor in the world. I'm just a guy who works hard and got really lucky.

And I'm grateful for that luck. I'm grateful for every opportunity I've had. I'm grateful for every person who's helped me along the way. I'm grateful for every fan who's supported me.

I'm just a regular guy who got really lucky, and I'm not going to forget that. I'm not going to take it for granted. I'm not going to act like I'm better than anyone else.

Because I'm not. I'm just a regular guy who got really lucky. That's it. That's my story. That's my journey. That's who I am.

And I'm proud of that. I'm proud of my story. I'm proud of my journey. I'm proud of who I am.

I'm Chris Pratt, and I'm just a regular guy who got really lucky. And I'm not afraid to admit it.

Thank you. Thank you so much. This means the world to me. Thank you.""")

def main():
    """Generate all speech documents"""
    print("Generating speech documents for all voice actors...")
    
    base_dir = create_directory_structure()
    
    print("Generating Trump documents...")
    generate_trump_documents(base_dir)
    
    print("Generating Obama documents...")
    generate_obama_documents(base_dir)
    
    print("Generating Modi documents...")
    generate_modi_documents(base_dir)
    
    print("Generating SRK documents...")
    generate_srk_documents(base_dir)
    
    print("Generating Technoblade documents...")
    generate_technoblade_documents(base_dir)
    
    print("Generating Chris Pratt documents...")
    generate_chrispratt_documents(base_dir)
    
    print(f"\n✅ All speech documents generated in: {base_dir}")
    print("\nDocument structure:")
    for actor in ["trump", "obama", "modi", "srk", "technoblade", "chrispratt"]:
        actor_dir = os.path.join(base_dir, actor)
        files = os.listdir(actor_dir)
        print(f"  {actor}/: {', '.join(files)}")

if __name__ == "__main__":
    main() 