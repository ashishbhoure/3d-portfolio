import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollAnimation = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2
    });

    const variants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        hidden: { opacity: 0, y: 80 }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            className="..."
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;