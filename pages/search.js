import Head from 'next/head'
import Header from '../components/Header'
import Response from '../Response';
import { useRouter } from 'next/router';
import SearchResults from '../components/SearchResults';


export default function Search({ data }) {
    
    const router = useRouter();

    //console.log(data);
    return (
        <div>
            <Head>
                <title>{router.query.term} - Google Search</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            <Header />

            {/* Search Results */}
            <SearchResults results={ data }/>
        </div>
    )
}

export async function getServerSideProps(context) {

    const useDummyData = false;
    const startIndex = context.query.start || 0;

    const res = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`);

    //const res = useDummyData ? Response : await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`);
    const data = await res.json();
    //const data = res;


    return {
        props: {
            data,
        },
    };
};
