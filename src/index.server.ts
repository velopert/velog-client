import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import proxy from 'koa-better-http-proxy';
import Router from '@koa/router';
import ssrMiddleware from './server/ssrMiddleware';

console.log(process.env.REACT_APP_SSR);

const app = new Koa();
const router = new Router();

app.use(
  serve(path.resolve('./build'), {
    index: false,
  }),
);

const proxyMiddleware = proxy('localhost', { port: 5000 });

app.use(router.routes()).use(router.allowedMethods());

app.use(ssrMiddleware);
app.use(proxyMiddleware);
router.get('/ads.txt', (ctx) => {
  ctx.body = `google.com, pub-5574866530496701, DIRECT, f08c47fec0942fa0
setupad.com, 1557, DIRECT 
google.com, pub-7383171830614216, RESELLER, f08c47fec0942fa0 
google.com, pub-3970277535528613, RESELLER, f08c47fec0942fa0 
rubiconproject.com, 13606, RESELLER, 0bfd66d529a55807 
rubiconproject.com, 21118, RESELLER, 0bfd66d529a55807 
appnexus.com, 3711, RESELLER 
adform.com, 1484, RESELLER 
pubmatic.com, 156191, RESELLER, 5d62403b186f2ace 
sovrn.com, 252889, RESELLER, fafdf38b16bf6b2b 
lijit.com, 252889, RESELLER, fafdf38b16bf6b2b 
appnexus.com, 1360, RESELLER, f5ab79cb980f11d1 
gumgum.com, 11645, RESELLER, ffdef49475d318a9 
openx.com, 537120960, RESELLER 
openx.com, 539924617, RESELLER, 6a698e2ec38604c6 
openx.com, 83499, RESELLER 
openx.com, 538959099, RESELLER, 6a698e2ec38604c6 
openx.com, 540890784, DIRECT, 6a698e2ec38604c6 
pubmatic.com, 137711, RESELLER, 5d62403b186f2ace 
pubmatic.com, 156212, RESELLER, 5d62403b186f2ace 
pubmatic.com, 156700, RESELLER, 5d62403b186f2ace 
rubiconproject.com, 17960, RESELLER, 0bfd66d529a55807 
pubmatic.com, 62483, RESELLER 
contextweb.com, 558511, RESELLER 
emxdgt.com, 242, DIRECT, 1e1d41537f7cad7f 
appnexus.com, 1356, RESELLER, f5ab79cb980f11d1 
smartadserver.com, 1776, DIRECT 
contextweb.com, 561376, RESELLER, 89ff185a4c4e857c 
admixer.net, E1FD631C-1259-4EF3-A0F3-452A8B59DCB2, DIRECT 
improvedigital.com, 803, DIRECT 
indexexchange.com, 186102, DIRECT 
adocean-global.com, 83598, DIRECT 
districtm.io, 101521, DIRECT 
google.com, pub-9685734445476814, RESELLER, f08c47fec0942fa0 
RTBHOUSE.COM, d2380d6f45eaac2c7d22, DIRECT 
betweendigital.com, 35081, DIRECT 
aps.amazon.com,d14c8d3d-c09a-40c7-8c08-b5d7cd1d7fac,DIRECT 
pubmatic.com,157150,RESELLER,5d62403b186f2ace 
openx.com,540191398,RESELLER,6a698e2ec38604c6 
rubiconproject.com,18020,RESELLER,0bfd66d529a55807 
appnexus.com,1908,RESELLER,f5ab79cb980f11d1 
smaato.com,1100044650,RESELLER,07bcf65f187117b4 
adtech.com,12068,RESELLER,e1a5b5b6e3255540 
ad-generation.jp,12474,RESELLER,7f4ea9029ac04e53 
districtm.io,100962,RESELLER,3fd707be9c4527c3 
appnexus.com,3663,RESELLER,f5ab79cb980f11d1 
rhythmone.com,1654642120,RESELLER,a670c89d4a324e47 
yahoo.com,55029,RESELLER,e1a5b5b6e3255540 
gumgum.com,14141,RESELLER,ffdef49475d318a9 
pubmatic.com, 160006, RESELLER, 5d62403b186f2ace 
pubmatic.com,160096,RESELLER,5d62403b186f2ace 
yieldmo.com,2719019867620450718,RESELLER 
yahoo.com,55774,DIRECT 
emxdgt.com,2009,RESELLER,1e1d41537f7cad7f 
smartadserver.com,4125,RESELLER,060d053dcf45cbf3 
themediagrid.com,jtqkmp,RESELLER,35d5010d7789b49d 
sovrn.com,375328,RESELLER,fafdf38b16bf6b2b 
lijit.com,375328,RESELLER,fafdf38b16bf6b2b 
aps.amazon.com, dce921de-ffa9-46de-b23a-dcb73faca71d, DIRECT 
sharethrough.com,7144eb80,RESELLER,d53b998a7bd4ecd2 
contextweb.com,562541,RESELLER,89ff185a4c4e857c 
pubmatic.com,161085,DIRECT,5d62403b186f2ace 
beachfront.com,14804,RESELLER,e2541279e8e2ca4d 
improvedigital.com,2050,RESELLER 
sonobi.com,7f5fa520f8,RESELLER,d1a215d9eb5aee9e 
mintegral.com,10043,RESELLER,0aeed750c80d6423 
lijit.com, 252889-eb, DIRECT, fafdf38b16bf6b2b 
smartadserver.com, 3527, DIRECT 
contextweb.com, 560288, RESELLER, 89ff185a4c4e857c 
pubmatic.com, 156439, RESELLER 
pubmatic.com, 154037, RESELLER 
rubiconproject.com, 16114, RESELLER, 0bfd66d529a55807 
openx.com, 537149888, RESELLER, 6a698e2ec38604c6 
appnexus.com, 3703, RESELLER, f5ab79cb980f11d1 
districtm.io, 101760, RESELLER, 3fd707be9c4527c3 
loopme.com, s-2411, RESELLER, 6c8d5f95897a5a3b 
loopme.com, 5679, RESELLER, 6c8d5f95897a5a3b 
xad.com, 958, RESELLER, 81cbf0a75a5e0e9a 
indexexchange.com, 191541, RESELLER 
#Admixer 
admixer.net, 099e1459-d18f-4339-931b-2dab1bbc8a7d, RESELLER 
yieldnexus.com, 96204, RESELLER 
audience.media, 100358, RESELLER 
appnexus.com, 10617, RESELLER 
appnexus.com, 9393, RESELLER 
advertising.com, 25034, RESELLER 
admanmedia.com, 584, DIRECT 
video.unrulymedia.com, 3948367200, RESELLER 
inmobi.com, 3a4f7da341dd490cbb7dde02b126275e, RESELLER, 83e75a7ae333ca9d 
sonobi.com, 7b37f8ccbc, RESELLER, d1a215d9eb5aee9e 
improvedigital.com, 1668, RESELLER 
indexexchange.com, 191497, RESELLER 
pubmatic.com, 157562, DIRECT, 5d62403b186f2ace 
advertising.com, 25001, RESELLER, e1a5b5b6e3255540 
rubiconproject.com, 18224, RESELLER, 0bfd66d529a55807 
spotxchange.com, 119135, RESELLER, 7842df1d2fe2db34 
spotx.tv, 119135, RESELLER, 7842df1d2fe2db34 
smartadserver.com, 1894, RESELLER 
smartadserver.com, 3445, RESELLER 
rhythmone.com, 1816189007, RESELLER, a670c89d4a324e47 
betweendigital.com, 43070, DIRECT 
rubiconproject.com, 19724, RESELLER, 0bfd66d529a55807 
google.com, pub-5289985627731322, RESELLER, f08c47fec0942fa0 
#Adagio 
adagio.io, 1053, DIRECT 
rubiconproject.com, 19116, RESELLER, 0bfd66d529a55807 
pubmatic.com, 159110, RESELLER, 5d62403b186f2ace 
improvedigital.com, 1790, RESELLER 
onetag.com, 6b859b96c564fbe, RESELLER 
indexexchange.com, 194558, RESELLER 
pubwise.io, 68867843, RESELLER, c327c91a93a7cdd3 
richaudience.com, 1BTOoaD22a, DIRECT 
#33Across 
33across.com, 0010b00002bTS1QAAW, DIRECT, bbea06d9c4d2853c 
adtech.com, 12094, RESELLER 
adtech.com, 9993, RESELLER 
aol.com, 47594, RESELLER, e1a5b5b6e3255540 
yahoo.com, 55188, DIRECT, e1a5b5b6e3255540 
advangelists.com, 8d3bba7425e7c98c50f52ca1b52d3735, RESELLER, 60d26397ec060f98 
sonobi.com, a416546bb7, RESELLER, d1a215d9eb5aee9e 
yoc.com, 5600, DIRECT 
#JustPremium 
appnexus.com, 7118, RESELLER 
spotx.tv, 108933, RESELLER, 7842df1d2fe2db34 
spotxchange.com, 108933, RESELLER, 7842df1d2fe2db34 
improvedigital.com, 185, RESELLER 
adform.com, 183, RESELLER 
freewheel.tv, 33081, RESELLER 
freewheel.tv, 33601, RESELLER 
indexexchange.com, 189872, RESELLER 
openx.com, 540925214, RESELLER, 6a698e2ec38604c6 
google.com, pub-8172268348509349, RESELLER, f08c47fec0942fa0 
#Eskimi 
eskimi.com, eas-2020000001, DIRECT 
#RhythmOne 
video.unrulymedia.com, 5831063052797481612, DIRECT 
rhythmone.com, 5831063052797481612, DIRECT, a670c89d4a324e47 
indexexchange.com, 182257, RESELLER 
appnexus.com, 6849, RESELLER 
rubiconproject.com, 15268, RESELLER 
spotxchange.com, 285547, RESELLER, 7842df1d2fe2db34 
spotx.tv, 285547, RESELLER, 7842df1d2fe2db34 
pubmatic.com, 159277, RESELLER, 5d62403b186f2ace 
advertising.com, 28605, RESELLER 
improvedigital.com, 1699, RESELLER 
#LuponMedia 
luponmedia.com, 1994505, DIRECT 
adform.com, 1985, DIRECT, 9f5210a2f0999e32 
rubiconproject.com, 12398, DIRECT, 0bfd66d529a55807 
pubmatic.com, 159760, RESELLER, 5d62403b186f2ace 
connectad.io, 151, DIRECT 
pubmatic.com, 156077, RESELLER, 5d62403b186f2ace 
pubmatic.com, 55990, RESELLER, 5d62403b186f2ace 
openx.com, 537145117, RESELLER, 6a698e2ec38604c6 
adform.com, 768, RESELLER 
indexexchange.com, 190906, DIRECT, 50b1c356f2c5c8fc 
appnexus.com, 8738, RESELLER, f5ab79cb980f11d1 
EMXDGT.com, 1138, DIRECT, 1e1d41537f7cad7f 
google.com, pub-5995202563537249, RESELLER, f08c47fec0942fa0 
sovrn.com, 244287, DIRECT, fafdf38b16bf6b2b 
lijit.com, 244287, DIRECT, fafdf38b16bf6b2b 
lijit.com, 244287-eb, DIRECT, fafdf38b16bf6b2b 
yahoo.com, 55248, DIRECT 
rubiconproject.com, 13132, RESELLER, 0bfd66d529a55807 
rubiconproject.com, 17250, RESELLER, 0bfd66d529a55807 
xad.com, 240, RESELLER, 81cbf0a75a5e0e9a 
onetag.com, 5d4e109247a89f6, DIRECT 
advertising.com, 28246, RESELLER 
sovrn.com, 247505, DIRECT, fafdf38b16bf6b2b  
lijit.com, 247505, DIRECT, fafdf38b16bf6b2b  
lijit.com, 247505-eb, DIRECT, fafdf38b16bf6b2b 
conversantmedia.com, 100264, RESELLER, 03113cd04947736d 
adform.com, 2795, RESELLER 
admixer.co.kr,1538,RESELLER 
betweendigital.com, 43837, RESELLER 
ssp.e-volution.ai, AJxF6R108a9M6CaTvK, RESELLER 
ssp.logan.ai, LG4, RESELLER 
#AMX 
amxrtb.com, 105199421, DIRECT 
indexexchange.com, 191503, RESELLER 
appnexus.com, 11786, RESELLER 
appnexus.com, 12290, RESELLER 
appnexus.com, 9393, RESELLER #Video #Display 
appnexus.com, 3153, RESELLER, f5ab79cb980f11d1 
appnexus.com, 11924, RESELLER, f5ab79cb980f11d1 
lijit.com, 260380, RESELLER, fafdf38b16bf6b2b 
sovrn.com, 260380, RESELLER, fafdf38b16bf6b2b 
advertising.com, 28305, RESELLER 
#NoBid 
nobid.io, 22120307115, DIRECT 
google.com, pub-1835489473992347, DIRECT, f08c47fec0942fa0 
google.com, pub-1789253751882305, DIRECT, f08c47fec0942fa0 
appnexus.com, 11429, DIRECT, f5ab79cb980f11d1 
rubiconproject.com, 13702, DIRECT, 0bfd66d529a55807 
indexexchange.com, 185104, DIRECT, 50b1c356f2c5c8fc 
pubmatic.com, 157898, DIRECT, 5d62403b186f2ace 
sovrn.com, 273657, DIRECT, fafdf38b16bf6b2b 
lijit.com, 273657, DIRECT, fafdf38b16bf6b2b 
adtech.com, 10109, DIRECT 
aolcloud.net, 10109, DIRECT 
openx.com, 540650310, DIRECT, 6a698e2ec38604c6 
gumgum.com, 13926, DIRECT, ffdef49475d318a9 
33across.com, 0010b00002Mq2FYAAZ, DIRECT, bbea06d9c4d2853c 
sonobi.com, bc2afab5f7, DIRECT, d1a215d9eb5aee9e 
revcontent.com, 124709, DIRECT 
my6sense.com, 9732, RESELLER 
criteo.com, 7822, RESELLER 
rhythmone.com, 2439829435, RESELLER, a670c89d4a324e47 
emxdgt.com, 326, RESELLER, 1e1d41537f7cad7f 
#Adyoulike 
adyoulike.com, e5d58aeeb93b1fb77c4e17409eea8a3a, DIRECT 
appnexus.com, 9733, RESELLER 
rubiconproject.com, 20736, RESELLER, 0bfd66d529a55807 
openx.com, 540847510, RESELLER, 6a698e2ec38604c6 
spotxchange.com, 230037, RESELLER, 7842df1d2fe2db34 
spotx.tv, 230037, RESELLER, 7842df1d2fe2db34 
themediagrid.com, RYIDPE, DIRECT, 35d5010d7789b49d 
criteo.com, B-061463, DIRECT, 9fac4a4a87c2a44f 
adform.com, 1835, RESELLER, 9f5210a2f0999e32 
admanmedia.com,726,RESELLER 
advertising.com, 28949, DIRECT #Verizon - RevNew 
smartadserver.com,3447,DIRECT 
pubwise.io, 27754564, RESELLER, c327c91a93a7cdd3 #PubWise 
onetag.com, 694e68b73971b58, DIRECT 
conversantmedia.com, 100257, DIRECT, 03113cd04947736d 
pubmatic.com, 160925, RESELLER, 5d62403b186f2ace 
smartadserver.com, 4144, DIRECT 
smartadserver.com, 4016, DIRECT 
smartadserver.com, 4012, DIRECT 
smartadserver.com, 4071, DIRECT 
smartadserver.com, 4073, DIRECT 
smartadserver.com, 4074, DIRECT 
indexexchange.com, 194056, DIRECT 
rubiconproject.com, 23220, RESELLER, 0bfd66d529a55807 
openx.com, 544005210, RESELLER, 6a698e2ec38604c6  
pubmatic.com, 160623, RESELLER, 5d62403b186f2ace 
onetag.com, 753951255855558-OB, DIRECT 
sharethrough.com, GBPtKPVp, DIRECT, d53b998a7bd4ecd2 
#Sharethrough 
sharethrough.com, c73f63f1, DIRECT, d53b998a7bd4ecd2 
indexexchange.com, 186046, RESELLER 
spotxchange.com, 212457, RESELLER 
spotx.tv, 212457, RESELLER 
pubmatic.com, 156557, RESELLER 
pubmatic.com, 158723, RESELLER, 5d62403b186f2ace 
rubiconproject.com, 18694, RESELLER, 0bfd66d529a55807 
openx.com, 540274407, RESELLER, 6a698e2ec38604c6 
33across.com, 0013300001kQj2HAAS, RESELLER, bbea06d9c4d2853c 
smaato.com, 1100047713, RESELLER, 07bcf65f187117b4 
indexexchange.com, 195658, RESELLER, 50b1c356f2c5c8fc 
pubmatic.com, 161085, RESELLER, 5d62403b186f2ace 
#BetweenX 
openx.com, 541177349, RESELLER, 6a698e2ec38604c6 
pubmatic.com, 159668, RESELLER, 5d62403b186f2ace 
adcolony.com, 29b7f4a14dc689eb, RESELLER, 1ad675c9de6b5176 
meitu.com, 654, RESELLER 
rhythmone.com, 3880497124, RESELLER, a670c89d4a324e47 
video.unrulymedia.com, 3880497124, RESELLER 
sovrn.com, 273644, RESELLER, fafdf38b16bf6b2b 
lijit.com, 273644, RESELLER, fafdf38b16bf6b2b 
onetag.com, 5d1628750185ace, RESELLER 
loopme.com, 11278, RESELLER, 6c8d5f95897a5a3b 
emxdgt.com, 2047, RESELLER, 1e1d41537f7cad7f 
opera.com, pub5449961587776, RESELLER, 55a0c5fd61378de3 
#OneTag 
onetag.com, 753951255855558, DIRECT 
rubiconproject.com, 11006, RESELLER, 0bfd66d529a55807 
google.com, pub-3769010358500643, RESELLER, f08c47fec0942fa0 
freewheel.tv, 20393, RESELLER 
freewheel.tv, 24377, RESELLER 
yahoo.com, 58905, RESELLER, e1a5b5b6e3255540 
aol.com, 58905, RESELLER, e1a5b5b6e3255540 
appnexus.com, 13099, RESELLER 
smartadserver.com, 4111, RESELLER 
# 152Media 
152media.com, 152, DIRECT 
# Criteo 
themediagrid.com, A6ODQF, DIRECT, 35d5010d7789b49d 
# Adtelligent 
adtelligent.com, 534151, DIRECT 
33across.com, 0010b00002T3JniAAF, DIRECT, bbea06d9c4d2853c 
152media.info, 152M10, RESELLER 
bidmatic.io, b-82687, DIRECT 
e-planning.net, 835fbafe26d231b1, DIRECT, c1ba615865ed87b2 
improvedigital.com, 1628, DIRECT 
indexexchange.com, 189529, DIRECT, 50b1c356f2c5c8fc 
lijit.com, 310770, DIRECT, fafdf38b16bf6b2b 
loopme.com, 11378, RESELLER, 6c8d5f95897a5a3b 
onetag.com, 59a18369e249bfb, DIRECT 
openx.com, 541177116, RESELLER, 6a698e2ec38604c6 
pubmatic.com, 156813, DIRECT, 5d62403b186f2ace 
rhythmone.com, 144481089, RESELLER, a670c89d4a324e47 
rubiconproject.com, 17184, DIRECT, 0bfd66d529a55807 
sovrn.com, 310770, DIRECT, fafdf38b16bf6b2b 
spotim.market, 4446666, DIRECT, 077e5f709d15bdbb 
video.unrulymedia.com, 144481089, RESELLER 
# Conversant 
conversantmedia.com, 100359, RESELLER, 03113cd04947736d 
appnexus.com, 4052, RESELLER 
contextweb.com, 561998, RESELLER, 89ff185a4c4e857c 
openx.com, 540031703, RESELLER, 6a698e2ec38604c6 
pubmatic.com, 158100, RESELLER, 5d62403b186f2ace 
rubiconproject.com, 23644, RESELLER, 0bfd66d529a55807 
yahoo.com, 55771, RESELLER, e1a5b5b6e3255540 
# TAM - Acuity Ads 
admanmedia.com, 962, DIRECT 
smartadserver.com, 3713, RESELLER 
openx.com, 540866936, RESELLER, 6a698e2ec38604c6 
rubiconproject.com, 14558, RESELLER, 0bfd66d529a55807 
pubmatic.com, 158481, RESELLER, 5d62403b186f2ace 
adform.com, 2671, RESELLER 
rhythmone.com, 3948367200, RESELLER, a670c89d4a324e47 
axonix.com, 57869, RESELLER 
# Holid 
holid.io, 543, DIRECT 
adform.com, 1612, RESELLER 
improvedigital.com, 1134, RESELLER 
appnexus.com, 11179, RESELLER 
rubiconproject.com, 19172, RESELLER, 0bfd66d529a55807 
adpone.com, 1f3b14785831ec9153c5, DIRECT 
google.com, pub-2128757167812663, RESELLER, f08c47fec0942fa0 
rubiconproject.com, 17210, RESELLER, 0bfd66d529a55807 
rubiconproject.com, 20266, RESELLER, 0bfd66d529a55807 
appnexus.com, 10264, DIRECT 
appnexus.com, 10264, RESELLER 
pubmatic.com, 156383, RESELLER, 5d62403b186f2ace 
pubmatic.com, 157841, RESELLER, 5d62403b186f2ace 
pubmatic.com, 161173, RESELLER, 5d62403b186f2ace 
openx.com, 537122561, RESELLER 
openx.com, 539966405, RESELLER, 6a698e2ec38604c6 
openx.com, 540603695, RESELLER, 6a698e2ec38604c6 
adform.com, 2474, DIRECT 
appnexus.com, 2725, RESELLER, f5ab79cb980f11d1 
yahoo.com, 59739, RESELLER, e1a5b5b6e3255540 
yahoo.com, 59740, RESELLER, e1a5b5b6e3255540 
yahoo.com, 59741, RESELLER, e1a5b5b6e3255540`;
});
// router.post('/graphql', proxyMiddleware);

app.listen(3001, () => {
  console.log('SSR server is listening to http://localhost:3001');
});
