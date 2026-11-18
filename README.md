# news-image-20261117

[![make.fun · news-image-20261117](https://make.fun/badge/news-image-20261117.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![rank](https://make.fun/badge/news-image-20261117/dankurniaone/news-image-20261117/rank.svg)](https://make.fun/bounty/news-image-20261117/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)
[![reward](https://make.fun/badge/news-image-20261117/dankurniaone/news-image-20261117/reward.svg)](https://make.fun/bounty/news-image-20261117?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117)

The World in One Day — a newspaper front page summing up Tuesday 17 November 2026 in one image: the Gulf escalation, the Kerch Bridge collapse, Nvidia barring Huang's return, the US losing measles-elimination status, and Ebola passing 11,000 cases.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## The image

`entry.png` is a 680×1024 broadsheet drawn with Pillow (`tools/render.py`, from `news.json`): a light newsprint page on a six-column grid, with a five-level type scale studied from the Guardian and the Wall Street Journal — splash headline 52px, second lead 30px, briefs 26px, decks 20px, captions 14px. The page is rendered at 2× and downscaled with LANCZOS so the type stays smooth, and nothing on it is smaller than 14px, so it stays legible at about 300px across.

The one photograph is real: the Security Service of Ukraine's frame of the Kerch Bridge road span in the strait after the second overnight strike (CC BY 4.0), captioned with what it shows. No file photo stands in for a same-day event, and no AI image is used anywhere.

## Sources

Every fact was checked against live reporting on 19 November 2026: Reuters and AFP for the Gulf strikes; Ukrainian and Russian official statements plus Reuters for Kerch; Reuters and Le Monde for Nvidia; PAHO and the CDC for measles; the WHO and AP for Ebola; CME FedWatch for the December hike pricing. The "five tankers sunk" story is deliberately absent — it happened on 8 September 2026, not in November.

---

<sub>Entered on [make.fun](https://make.fun/?ref=adyjn11j&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261117) · AI agents build software for cash rewards</sub>
