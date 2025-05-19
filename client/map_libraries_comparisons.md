# Vergleich von Mapping-Libraries: OpenLayers, Leaflet, Mapbox GL JS und MapLibre GL JS

| Eigenschaft                  | OpenLayers                     | Leaflet                                       | Mapbox GL JS                      | MapLibre GL JS                    |
| ---------------------------- | ------------------------------ | --------------------------------------------- | --------------------------------- | --------------------------------- |
| **Allgemein**                |
| Lizenz                       | BSD 2-Clause                   | BSD 2-Clause                                  | Proprietär (seit v2)              | BSD 3-Clause                      |
| Kostenlose Nutzung           | Unbegrenzt                     | Unbegrenzt                                    | Begrenzt                          | Unbegrenzt                        |
| Erstveröffentlichung         | 2006                           | 2011                                          | 2014                              | 2020 (Fork von Mapbox GL JS)      |
| Aktueller Status             | Aktiv                          | Aktiv                                         | Aktiv                             | Aktiv                             |
| **Technische Eigenschaften** |
| Rendering-Technologie        | HTML5 Canvas/WebGL             | HTML5/DOM/SVG                                 | WebGL                             | WebGL                             |
| 3D-Unterstützung             | Begrenzt                       | Nein                                          | Umfassend                         | Umfassend                         |
| Vektortiles                  | Nativ                          | Plugins erforderlich                          | Nativ                             | Nativ                             |
| Performance                  | Gut                            | Mittel                                        | Sehr gut                          | Sehr gut                          |
| Dateigröße (min+gzip)        | ~152 KB                        | 42 KB (ohne Plugins!)                         | ~394 KB                           | ~234 KB                           |
| **Funktionalitäten**         |
| Kartenstile                  | Sehr Flexibel                  | Grundlegend                                   | Sehr flexibel                     | Sehr flexibel                     |
| Geodatenformate              | Umfangreich                    | Grundlegend (GeoJSON, etc.)                   | Umfangreich                       | Umfangreich                       |
| Projektionen (Rendering)     | Fast alle (PROJ4JS)            | Web Mercator, mehr via Plugin                 | Alle wichtigen                    | Web Mercator, mehr in Entwicklung |
| Datenvisualisierung          | Umfangreich                    | Grundlegend, mehr via Plugins                 | Umfangreich                       | Umfangreich                       |
| **Nutzung und Integration**  |
| Lernkurve                    | Mittel                         | Flach                                         | Mittel                            | Mittel                            |
| Dokumentation                | Gut                            | Sehr gut                                      | Sehr gut                          | Gut                               |
| Plugin-Ökosystem             | Umfangreich                    | Sehr umfangreich                              | Begrenzt                          | Wachsend                          |
| TypeScript-Unterstützung     | Ja                             | Ja                                            | Ja                                | Ja                                |
| React-Integration            | Gut                            | Gut                                           | Gut                               | Gut                               |
| **Bewertung**                | Stabil, viele Funktionen       | Einfach, wenig Features, Plugin-Ökosystem mit | Sehr mächtig, kommerzielle Lizenz | Fork von Mapbox GL JS, mächtig    |
|                              | "geschwätzig"/viel Boilerplate | viel ungeprüfter Code und Abhängigkeiten      | Performantes Rendering            | (Noch) keine nutzerdefinierten Projektionen |
