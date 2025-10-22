import {motion} from "framer-motion";
export const Motion = ({children}) =>{
    return (
        <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="flex justify-center font-first text-amber-50"
                    >
                        {children}
                    </motion.div>
    )
}