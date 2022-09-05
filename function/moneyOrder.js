export default (data) => {
  const randomId = Math.floor(10000000 + Math.random() * 90000000)
  return `<?xml version="1.0" encoding="UTF-8"?>
    <MoneyData>
      <UpdateHd>1</UpdateHd>
      <SeznamFirem>
        <Firma>
          <GUID>{13FE548C-1A7C-4896-B648-1AF094AA8492}</GUID>
          <Nazev>${data.firmInfo?.nameCompany?.length ? data.firmInfo.nameCompany : data.name+" "+data.surname}</Nazev>
          <Adresa>
            <Ulice>${data.address}</Ulice>
            <Misto>${data.city}</Misto>
            <PSC>${data.zip}</PSC>
            <Stat>${data.state}</Stat>
            <KodStatu>CZ</KodStatu>
          </Adresa>
          <ObchNazev>${data.firmInfo?.nameCompany?.length ? data.firmInfo.nameCompany : data.name+" "+data.surname}</ObchNazev>
          <ObchAdresa>
            <Ulice>${data.address}</Ulice>
            <Misto>${data.city}</Misto>
            <PSC>${data.zip}</PSC>
            <Stat>${data.state}</Stat>
            <KodStatu>CZ</KodStatu>
          </ObchAdresa>
          <FaktNazev>${data.firmInfo?.nameCompany?.length ? data.firmInfo.nameCompany : data.name+" "+data.surname}</FaktNazev>
          <FaktAdresa>
            <Ulice>${data.address}</Ulice>
            <Misto>${data.city}</Misto>
            <PSC>${data.zip}</PSC>
            <Stat>${data.state}</Stat>
            <KodStatu>CZ</KodStatu>
          </FaktAdresa>
          <Mobil>
            <Cislo>${data.phone}</Cislo>
          </Mobil>
          <EMail>${data.email}</EMail>
          <ICO>${data.firmInfo?.ico || ''}</ICO>
          <DIC>${data.firmInfo?.dic || ''}</DIC>
          <eshop>
            <IN_Export>6</IN_Export>
          </eshop>
          <Osoba>
            <Jmeno>${data.name}</Jmeno>
            <Prijmeni>${data.surname}</Prijmeni>
            <Jednatel>1</Jednatel>
          </Osoba>
        </Firma>
      </SeznamFirem>
      <SeznamObjPrij>
        <ObjPrij>
          <Doklad>${randomId}</Doklad>
          <Popis>Objednávka z e-shopu (${randomId})</Popis>
          <Poznamka>${data.description}</Poznamka>
          <DodOdb>
            <GUID>{13FE548C-1A7C-4896-B648-1AF094AA8492}</GUID>
            <ObchNazev>${data.firmInfo?.nameCompany?.length ? data.firmInfo.nameCompany : data.name+" "+data.surname}</ObchNazev>
            <ObchAdresa>
              <Ulice>${data.address}</Ulice>
              <Misto>${data.city}</Misto>
              <PSC>${data.zip}</PSC>
              <Stat>${data.state}</Stat>
              <KodStatu>CZ</KodStatu>
            </ObchAdresa>
            <FaktNazev>${data.firmInfo?.nameCompany?.length ? data.firmInfo.nameCompany : data.name+" "+data.surname}</FaktNazev>
            <FaktAdresa>
              <Ulice>${data.address}</Ulice>
              <Misto>${data.city}</Misto>
              <PSC>${data.zip}</PSC>
              <Stat>${data.state}</Stat>
              <KodStatu>CZ</KodStatu>
            </FaktAdresa>
            <Tel>
              <Cislo>${data.phone}</Cislo>
            </Tel>
            <EMail>${data.email}</EMail>
          </DodOdb>
          <KonecPrij>
            <Nazev>${data.name+" "+data.surname}</Nazev>
            <Adresa>
              <Ulice>${data.address}</Ulice>
              <Misto>${data.city}</Misto>
              <PSC>${data.zip}</PSC>
              <Stat>${data.state}</Stat>
            </Adresa>
            <Tel>
              <Pred>+420</Pred>
              <Cislo>${data.phone}</Cislo>
            </Tel>
          </KonecPrij>
          <KPFromOdb>0</KPFromOdb>
          <PlatPodm>${data.payment.name}</PlatPodm>
          <Doprava>${data.delivery.name}</Doprava>
          <PrimDoklad>${data.id}</PrimDoklad>
          <Sleva>0</Sleva>
          <eshop>
            <IN_Export>6</IN_Export>
            <IN_Poznamk>${data.description}</IN_Poznamk>
          </eshop>
          <Celkem>${data.sum}</Celkem>
          <Stredisko>ESHOP</Stredisko>
          <Nadpis>Přijatá objednávka</Nadpis>
          <VarSymbol>${randomId}</VarSymbol>
          <NeVyrizova>0</NeVyrizova>
          <SizDecDPH>0</SizDecDPH>
          <SizDecCelk>0</SizDecCelk>
          <ZobrPoznVy>0</ZobrPoznVy>
          <SazbaDPH1>15</SazbaDPH1>
          <SazbaDPH2>21</SazbaDPH2>
          <Sleva>0</Sleva>
        ${data.basketItem.map(item => `
          <Polozka>
            <Popis>${item.title}</Popis>
            <PocetMJ>${item.count}</PocetMJ>
            <Cena>${item.price}</Cena>
            <SazbaDPH>21</SazbaDPH>
            <TypCeny>1</TypCeny>
            <Sleva>0</Sleva>
            <CenovaHlad>Základní</CenovaHlad>
            <CenaPoSleve>1</CenaPoSleve>
            <Poradi>1</Poradi>
            <Valuty>0</Valuty>
            <Hmotnost>0</Hmotnost>
            <KmKarta>
              <GUID>${item.guid}</GUID>
              <Katalog>${item.code}</Katalog>
              <Popis>${item.title}</Popis>
            </KmKarta>
            <Sklad>
              <Nazev>Hlavní sklad</Nazev>
              <KodSkladu>HLV</KodSkladu>
              <GUID>{4F7A6CE9-A84A-4287-98BB-66BA52B81D38}</GUID>
              <CenikSklad>0</CenikSklad>
            </Sklad>
          </Polozka>
        `)}
          <Polozka>
            <Popis>Doprava</Popis>
            <PocetMJ>1</PocetMJ>
            <ZbyvaMJ>1</ZbyvaMJ>
            <Cena>${data.delivery.value}</Cena>
            <SazbaDPH>21</SazbaDPH>
            <TypCeny>1</TypCeny>
            <KmKarta>
              <Zkrat>Balík</Zkrat>
              <GUID>${data.delivery.guid}</GUID>
              ${data.delivery?.code ? `<Katalog>${data.delivery.code}</Katalog>` : ""}
              <TypKarty>sluzba</TypKarty>
            </KmKarta>
            ${data.delivery?.guid ? `<Katalog>${data.delivery.guid}</Katalog>` : ""}
            <Sleva>0</Sleva>
            <!--
            <Vystaveno>2010-06-01</Vystaveno>
            <Vyridit_do>2010-06-10</Vyridit_do>
            -->
            <CenaPoSleve>1</CenaPoSleve>
            - <NesklPolozka>
              <TypZarDoby>N</TypZarDoby>
            </NesklPolozka>
          </Polozka>
          <Polozka>
            <Popis>Platba</Popis>
            <PocetMJ>1</PocetMJ>
            <ZbyvaMJ>1</ZbyvaMJ>
            <Cena>${data.payment.value}</Cena>
            ${data.payment?.guid ? `<GUID>${data.payment.guid}</GUID>` : ""}
            ${data.payment?.code ? `<Katalog>${data.payment.code}</Katalog>` : ""}
            <SazbaDPH>21</SazbaDPH>
            <TypCeny>1</TypCeny>
            <Sleva>0</Sleva>
            <!--
            <Vystaveno>2010-06-01</Vystaveno>
            <Vyridit_do>2010-06-10</Vyridit_do>
            -->
            <CenaPoSleve>1</CenaPoSleve>
            - <NesklPolozka>
              <TypZarDoby>N</TypZarDoby>
            </NesklPolozka>
          </Polozka>
          <MojeFirma>
            <Nazev>Královská péče s.r.o.</Nazev>
            <Adresa>
              <Ulice>Hrázní 327/4a</Ulice>
              <Misto>Brno</Misto>
              <PSC>63500</PSC>
              <Stat>Česká republika</Stat>
              <KodStatu>CZ</KodStatu>
            </Adresa>
            <ObchNazev>Královská péče s.r.o.</ObchNazev>
            <ObchAdresa>
              <Ulice>Hrázní 327/4a</Ulice>
              <Misto>Brno</Misto>
              <PSC>63500</PSC>
              <Stat>Česká republika</Stat>
              <KodStatu>CZ</KodStatu>
            </ObchAdresa>
            <Tel>
              <Pred>+420</Pred>
              <Cislo>702830774</Cislo>
              <Klap/>
            </Tel>
            <Fax>
              <Pred/>
              <Cislo/>
              <Klap/>
            </Fax>
            <Mobil>
              <Pred/>
              <Cislo/>
            </Mobil>
            <EMail>info@kralovska-pece.cz</EMail>
            <WWW>kralovska-pece.cz</WWW>
            <ICO>03775933</ICO>
            <DIC>CZ03775933</DIC>
            <Banka/>
            <Ucet>2600739131</Ucet>
            <KodBanky>2010</KodBanky>
            <KodPartn/>
            <FyzOsoba>0</FyzOsoba>
            <SpisovaZnacka>C 86699 vedená u Krajského soudu v Brně</SpisovaZnacka>
            <MenaSymb>Kč</MenaSymb>
            <MenaKod>CZK</MenaKod>
          </MojeFirma>
        </ObjPrij>
      </SeznamObjPrij>
    </MoneyData>`
}