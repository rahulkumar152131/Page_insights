import React, { useEffect, useState } from 'react'
import './style.css';

const Insightes = () => {
    const [insight, setInsight] = useState([]);
    const [pages, setPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(null);
    async function getData() {
        //,page_fans_country,post_reactions_like_total,page_impressions_by_country_unique,page_impressions_unique,page_impressions,page_fans_by_like_source

        let token = 'EAAFdWf2Ty8QBO19xHOFM5Mb1W6fW4gZA8sp4rvKsZCoHvA0UJcejpYVPY4J9Towu857HZCh336JQP1tAQK6jEUHHvWULTrUlqckU3ivg8opUvdEM2bCkcHUxVs2qlfb30OmIHD3qbTZBwWMDUQUSZA031jsAoJkkRE5aZBaJFUqrma8ITkcBhkpRKMWH4tBUmlomW3gnIVMcU0Ac29nwZDZD'
        let pages = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${token}`
        ).then((res) => res.json()).then((res) => res.data);
        // console.log(pages?.[0]);
        setCurrentPage(pages?.[0])
        getInsight(pages?.[0]);
        setPages(pages);
    }
    async function getInsight(curPage) {
        let metrices = 'page_fans,page_fans_country,page_impressions_unique,page_impressions';
        let insight = await fetch(`https://graph.facebook.com/v19.0/${curPage?.id}/insights/?metric=${metrices}&access_token=${curPage?.access_token}`
        ).then((res) => res.json()).then((res) => res);
        console.log(insight);
        setInsight(insight.data);
    }

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        getInsight(currentPage);
    }, [])
    console.log(currentPage);
    console.log(pages);
    console.log(insight);
    return (
        <div className='insight-container'>
            <div className="get-insight">
                <select name="" id="">
                    {pages?.map((page, i) => (
                        <option key={i} value={pages.name} onChange={() => setCurrentPage(page)}>{page?.name}</option>
                    ))}
                </select>
                <div className="button">
                    <button onClick={() => getInsight(currentPage)}>Get Insight</button>
                </div>

            </div>
            {insight?.map((data, i) => (
                <h5 key={i}>{data?.title}:{data?.values?.length}</h5>
            ))}


        </div>
    )
}

export default Insightes
