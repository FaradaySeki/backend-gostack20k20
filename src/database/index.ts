import { createConnection, con } from 'typeorm';

createConnection().catch(err => {
  const regex = /^database (.*) not exist$/i; // regex constructor;
  if (regex.test(err.message)) {
    // const database = err.message.match(/"(.*)"/gi);
    const database = err.message.match(/(?<=").+?(?=")/gi);
    console.log(`seems like ${database} does not exists`);
  }
});

/*
\[(.*?)\]
Explanation:

\[ : [ is a meta char and needs to be escaped if you want to match it literally.
(.*?) : match everything in a non-greedy way and capture it.
\] : ] is a meta char and needs to be escaped if you want to match it literally.
* 
(?<=\[) - positive lookbehind for [

.*? - non greedy match for the content

(?=\]) - positive lookahead for ]
*/
