import {motion} from "framer-motion";

const animation = {
    initial: {opacity: 1 , x:100},
    animate : {opacity: 1, x:0},
    exit: {opacity: 0 , x:-100}

}
const animation1 = {
    initial: {opacity: 1 , y:-50},
    animate : {opacity: 1, y:0},
    exit: {opacity: 0 , y:50}

}
 const AnimationPage = ({children}   ) =>
{
    return(
        <motion.div variants={animation} initial="initial" animate="animate" exit="exit" transition={{duration:0.5}}> 
            {children}
        </motion.div>
    )
}
const AnimationPage1 = ({children}   ) =>
{
    return(
        <motion.div variants={animation1} initial="initial" animate="animate" exit="exit" transition={{duration:0.5}}> 
            {children}
        </motion.div>
    )
}
export {AnimationPage, AnimationPage1};