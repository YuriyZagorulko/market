import { serverSideTranslations } from "next-i18next/serverSideTranslations"

interface IProps{
    
}

const Help = (props: IProps) => {
    return(
        <div>

        </div>
    )
}

export async function getServerSideProps({ locale }) {
    return {
    props: await serverSideTranslations(locale, ['home','layout','sharedUI']),
    }
}

  
export default Help
