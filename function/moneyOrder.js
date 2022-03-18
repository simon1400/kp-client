export default (data) => {
  return `<?xml version="1.0" encoding="windows-1250"?>
    <MoneyData>
      <SeznamFirem>
        <Firma>
          <GUID>{13FE548C-1A7C-4896-B648-1AF094AA8492}</GUID>
          <Nazev>Josef Drahokoupil</Nazev>
          <Adresa>
            <Ulice>Osobn� 44</Ulice>
            <Misto>Brno</Misto>
            <PSC>62800</PSC>
            <Stat>�esk� republika</Stat>
            <KodStatu>CZ</KodStatu>
          </Adresa>
          <ObchNazev>ABC, s.r.o.</ObchNazev>
          <ObchAdresa>
            <Ulice>Firemn� 36</Ulice>
            <Misto>Brno</Misto>
            <PSC>60200</PSC>
            <Stat>�esk� republika</Stat>
            <KodStatu>CZ</KodStatu>
          </ObchAdresa>
          <FaktNazev>ABC, s.r.o.</FaktNazev>
          <FaktAdresa>
            <Ulice>Firemn� 36</Ulice>
            <Misto>Brno</Misto>
            <PSC>60200</PSC>
            <Stat>�esk� republika</Stat>
            <KodStatu>CZ</KodStatu>
          </FaktAdresa>
          <Mobil>
            <Pred>+420</Pred>
            <Cislo>602333444</Cislo>
          </Mobil>
          <EMail>josef.drahokoupil@e-mail.cz</EMail>
          <ICO>789456123</ICO>
          <DIC>CZ789456123</DIC>
          <eshop>
            <IN_Export>6</IN_Export>
          </eshop>
          <Osoba>
            <Jmeno>Drahokoupil</Jmeno>
            <Prijmeni>Josef</Prijmeni>
            <Jednatel>1</Jednatel>
          </Osoba>
        </Firma>
      </SeznamFirem>
      <SeznamObjPrij>
        <ObjPrij>
          <Popis>Objedn�vka z e-shopu (100200143)</Popis>
          <Poznamka>P��klad objedn�vky s vazbou na d��ve naimportovanou adresu.
          Adresa odb�ratele (DodOdb) obsahuje pouze vazebn� GUID. 
          Kone�n� p��jemce se pou�ije z adresy odb�ratele (KPFromOdb = 1).</Poznamka>
          <!-- 
          <Vystaveno>2010-06-01</Vystaveno>
          <Vyridit_do>2010-06-10/Vyridit_do> 
          -->
          <DodOdb>
            <GUID>{13FE548C-1A7C-4896-B648-1AF094AA8492}</GUID>
          </DodOdb>
          <KPFromOdb>1</KPFromOdb>
          <PlatPodm>dob�rkou</PlatPodm>
          <Doprava>PPL</Doprava>
          <PrimDoklad>100200143</PrimDoklad>
          <Sleva>0</Sleva>
          <eshop>
            <IN_Export>6</IN_Export>
            <IN_Poznamk>Po�lete pouze kompletn� objedn�vku.</IN_Poznamk>
          </eshop>
          <Polozka>
            <PocetMJ>1</PocetMJ>
            <Cena>11990</Cena>
            <SazbaDPH>21</SazbaDPH>
            <TypCeny>1</TypCeny>
            <Sleva>0</Sleva>
            <!--
            <Vystaveno>2010-06-01</Vystaveno>
            <Vyridit_do>2010-06-10</Vyridit_do>
            -->
            <CenovaHlad>Z�kladn�</CenovaHlad>
            <CenaPoSleve>1</CenaPoSleve>
            <KmKarta>
              <GUID>{82F6B7F5-0D31-4E39-B7C6-B31E26E6B7AD}</GUID>
            </KmKarta>
            <Sklad>
              <GUID>{504C55C5-461E-46C4-A42B-5242FDE76A03}</GUID>
            </Sklad>
            <Poznamka>vel. 29</Poznamka>
          </Polozka>
          <Polozka>
            <PocetMJ>1</PocetMJ>
            <Cena>3220</Cena>
            <SazbaDPH>21</SazbaDPH>
            <TypCeny>1</TypCeny>
            <Sleva>0</Sleva>
            <!--
            <Vystaveno>2010-06-01</Vystaveno>
            <Vyridit_do>2010-06-10</Vyridit_do>
            -->
            <CenovaHlad>ZAK_KARTA</CenovaHlad>
            <CenaPoSleve>1</CenaPoSleve>
            <KmKarta>
              <GUID>{482B84BB-7043-459C-A947-6E4F96B0C817}</GUID>
            </KmKarta>
            <Sklad>
              <GUID>{504C55C5-461E-46C4-A42B-5242FDE76A03}</GUID>
            </Sklad>
            <Poznamka>vel. 60</Poznamka>
          </Polozka>
          <Polozka>
            <Popis>Doprava</Popis>
            <PocetMJ>1</PocetMJ>
            <ZbyvaMJ>1</ZbyvaMJ>
            <Cena>120</Cena>
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
        </ObjPrij>
      </SeznamObjPrij>
    </MoneyData>`
}