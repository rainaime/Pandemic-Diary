import React from "react";

const dummyArticles = {
    "Sat Jun 06 2020": [
        {
            title: "1",
            content: "News content preview here",
            link: "https://news.google.com",
        },

        {
            title: "2",
            content: "News content preview here",
            link: "https://news.google.com",
        },
        {
            title: "3",
            content: "News content preview here",
            link: "https://news.google.com",
        },
        {
            title: "4",
            content: "News content preview here",
            link: "https://news.google.com",
        },
        {
            title: "5",
            content: "News content preview here",
            link: "https://news.google.com",
        },
        {
            title: "6",
            content: "News content preview here",
            link: "https://news.google.com",
        },
    ],
    "Sun Jun 07 2020": [
        {
            title: "7",
            content: "News content preview here",
            link: "https://news.google.com",
        },

        {
            title: "8",
            content: "News content preview here",
            link: "https://news.google.com",
        },
        {
            title: "9",
            content: "News content preview here",
            link: "https://news.google.com",
        },
        {
            title: "10",
            content: "News content preview here",
            link: "https://news.google.com",
        },
        {
            title: "11",
            content: "News content preview here",
            link: "https://news.google.com",
        },
        {
            title: "12",
            content: "News content preview here",
            link: "https://news.google.com",
        },
    ],
};
dummyArticles[new Date().toDateString()] = [
    {
        title: "Today's News Article",
        content: <img alt= ""style={{width: '100%'}} src="/image.png"></img>,
        link: "https://news.google.com",
    },
    {
        title: "Today's News Article",
        content: "News content preview here",
        link: "https://news.google.com",
    },
    {
        title: "Today's News Article",
        content: <img alt= ""style={{width: '100%'}} src="/image.png"></img>,
        link: "https://news.google.com",
    },
    {
        title: "Today's News Article",
        content: "News content preview here",
        link: "https://news.google.com",
    },
    {
        title: "Today's News Article",
        content: <img alt= ""style={{width: '100%'}} src="/image.png"></img>,
        link: "https://news.google.com",
    },
    {
        title: "Today's News Article",
        content: "News content preview here",
        link: "https://news.google.com",
    },
    {
        title: "Today's News Article",
        content: <img alt= ""style={{width: '100%'}} src="/image.png"></img>,
        link: "https://news.google.com",
    },
    {
        title: "Today's News Article",
        content: "News content preview here",
        link: "https://news.google.com",
    },
];

export default dummyArticles;

