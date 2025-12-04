import "./LP.css"

const LP: React.FC = () => {
    return (
        <>
            <header>
                <div className="header-title">
                    <div className="header-title-left">
                        <h3>
                            <span className="header-title-annoy">OJT・引き継ぎ</span>を
                            <br />
                            すべて まるっとサポート
                        </h3>
                        <a className="button" href="mailto:coffeecupjapan@yahoo.co.jp">連絡する ＞</a>
                    </div>
                    <div className="header-title-right">
                        <img className="header-title-right-img" src="./1_cropped_annoyed_woman.png" />
                    </div>
                </div>
                <div className="circle-above"></div>
                <div className="circle-below"></div>
            </header>
            <div id="main-section1">
                <div className="main-section1-issues">
                    <div className="main-section1-issue-item">
                        <img src="./4_OJT.jpg" />
                        <p>1 : 新人がOJTを受けても、なかなか一人で成長しない</p>
                    </div>
                    <div className="main-section1-issue-item">
                        <img src="./6_pair_programming.jpeg" />
                        <p>2 : 新人へのコードを書く指示出しが難しい</p>
                    </div>
                    <div className="main-section1-issue-item">
                        <img src="./5_IT_understanding.png" />
                        <p>3 : 新人や未経験者がプロジェクトを漂流する</p>
                    </div>
                    <div className="main-section1-issue-item">
                        <img src="./3_knowledge_transfer.jpg" />
                        <p>4 : 退職者の引き継ぎがうまくいかない</p>
                    </div>
                </div>
            </div>
            <div className="main-section2">
                <div className="circle-above"></div>
                <div className="circle-below"></div>
                <div className="main-section2-inner">
                    <p>実務コードの教材作成で解決</p>
                    <h3>
                        「<span>わかる！変わる！成果が出る！</span>」
                        <br />
                        OJT・引き継ぎを実現！
                    </h3>
                </div>
            </div>
            <div className="main-section3">
                <div className="main-section3-title">
                    <h3>OJT・引き継ぎDX「Read」</h3>
                    <p>
                        効果あります？「独学・ペアプロ・文書化・AIに聞く」に。
                        <br />
                        OJT・引き継ぎに「教材」という新しい道を。
                    </p>
                </div>
                <div className="main-section3-explain">
                    <div className="main-section3-explain-item">
                        <span>1</span>
                        <p>コード知識を</p>
                        <h4>「可視化する！」</h4>
                        <img src="./icon_visualize.png" />
                    </div>
                    <div className="main-section3-explain-item">
                        <span>2</span>
                        <p>コード知識を</p>
                        <h4>「共有できる！」</h4>
                        <img src="./icon_share.png" />
                    </div>
                    <div className="main-section3-explain-item">
                        <span>3</span>
                        <p>コードを</p>
                        <h4>「クイズで学べる！」</h4>
                        <img src="./icon_read.png" />
                    </div>
                </div>
                <div className="main-section3-inner">
                    <div className="main-section3-inner-right">
                        <img src="./linux_tokyo_mac.png" />
                    </div>
                    <div className="main-section3-inner-left">
                        <p><span>新人のOJTサポートから引き継ぎ支援まで</span>ワンストップ！</p>
                        <p>OJT・引き継ぎDX「Read」は</p>
                        <p><span>AIパワードな新しいコードの教材</span>を提供します！</p>
                        <div className="main-section3-inner-left-linux">
                            <span>Linuxカーネルの数千万行うち10万行を
                                <br />
                                可視化</span>した実績あり。
                        </div>
                        <div className="main-section3-inner-left-linux-reader">
                            <img src="./logo-linux-reader.png" />
                            <a href="https://linux.tokyo" className="button">linux.tokyo</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-section4">
                <div className="main-section4-card">
                    <h4>
                        <span>01</span>
                        <span className="main-section4-title-content">
                            コード知識を<strong>「可視化する！」</strong><br />
                            <small>難しいロジックの流れが木構造で表示</small>
                        </span>
                    </h4>
                    <div>
                        <h3>ロジックの流れが可視化されているので、エディタいらずで重要な関数だけ探索できます。</h3>
                        <img className="main-section4-card-image" src="./linux_visualize_overview.png" />
                        <img className="main-section4-card-image" src="./linux_tokyo_1_visualize.png" />
                        <p>
                            エンジニアの皆様であれば、コードの探索をしていて、関数が多すぎて迷子になったことは数十・数百回とあることでしょう。
                            <br />
                            私たちのソリューションは、事前に重要で読むべき関数探索だけをJSON形式で保存しているので、
                            <strong>ブラウザで描画された木構造の中で関数の進む探索・関数の戻る探索ができます。</strong>
                            <br />
                            <br />
                            <a className="button" href="https://linux.tokyo/trees/read_4_nvme_queue_rq__nvme_queue_rq_to_writel" target="_blank">Linuxカーネルでの例</a>
                        </p>
                    </div>
                </div>
                <div className="main-section4-card">
                    <h4>
                        <span>02</span>
                        <span className="main-section4-title-content">
                            コード知識を<strong>「共有できる！」</strong><br />
                            <small>関連するロジックだけに範囲絞り表示</small>
                        </span>
                    </h4>
                    <div>
                        <h3>先輩社員から後輩社員への指示出しの時などに、関連するコード箇所を可視化された形で共有できます。</h3>
                        <img className="main-section4-card-image" src="./linux_tokyo_1_share.png" />
                        <p>
                            以下の時に、「口頭」「チャットコミュニケーション」や「画面越し」だけでコードを説明していませんか？
                        </p>
                        <h6>1. 先輩社員からの後輩社員への「コードを書く」指示だし</h6>
                        <h6>2. 後輩社員への先輩社員による「書いたコード」のレビュー</h6>
                        <br />
                        <p>
                            私たちのソリューションは、コードの関数の流れを他の人に共有できるので、以下の改善ができます。
                            <ol>
                                <li>
                                    <span style={{ color: "#1ea183", fontWeight: "bold" }}>指示だし</span>では
                                    <u>「先輩社員が重要な関数の流れを共有」</u>し、<strong>後輩社員が膨大な量の全コードを読む手間を省ける</strong>
                                </li>
                                <li>
                                    <span style={{ color: "#1ea183", fontWeight: "bold" }}>レビュー</span>では
                                    <u>「後輩社員が自分が考えた関連する箇所を共有」</u>し、<strong>先輩社員は後輩社員の思考が合っているかを確認できる</strong>
                                </li>
                            </ol>
                        </p>
                    </div>
                </div>
                <div className="main-section4-card">
                    <h4>
                        <span>03</span>
                        <span className="main-section4-title-content">
                            コードを<strong>「クイズ形式で学べる！」</strong><br />
                            <small>重要なロジックの流れをクイズ形式で学習</small>
                        </span>
                    </h4>
                    <div>
                        <h3>設計や俯瞰図のみならず、関数の流れを１つ１つクイズ形式で学ぶこともできます。</h3>
                        <img className="main-section4-card-image" src="./linux_tokyo_1_teach.png" />
                        <p>
                            私たちのソリューションは、設計や俯瞰図だけではなく、コードの流れをクイズで学べる仕組みを作りました。
                            <br />
                            今の関数から「次に読むべき関数を選ぶ」クイズを出題できます！
                            <ol>
                                <li>コードの読解の正しい経路をインタラクティブに学べます</li>
                                <li>クイズも重要な関数の流れに絞られているので、知識を体系的に学べます</li>
                            </ol>
                        </p>
                        <p>
                            <a className="button" href="https://linux.tokyo/explore/open_3_ext4_lookup__ext4_lookup_to_ext4_dx_find_entry" target="_blank">Linuxカーネルでの例</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="main-section5">
                <h3>
                    <small>Flow</small>
                    <br />
                    ［ ご利用の流れ ］
                </h3>
                <div className="main-section5-inner">
                    <div className="main-section5-card">
                        <div className="main-section5-card-title">1</div>
                        <h4>お問い合わせ</h4>
                        <p>
                            お問い合わせのメール宛にお問い合わせください。後日担当から連絡いたします。
                            <br />
                            <br />
                            <a href="mailto:coffeecupjapan@yahoo.co.jp" className="button" style={{ marginTop: "10px" }}>お問い合わせ</a>
                        </p>
                    </div>
                    <div className="main-section5-card">
                        <div className="main-section5-card-title">2</div>
                        <h4>お打ち合わせ</h4>
                        <p>
                            打ち合わせにて、私たちがお役に立てそうか伺い、最適なプランを提案します。
                            <br />
                            ※ 対応言語などに制限があるため
                        </p>
                    </div>
                    <div className="main-section5-card">
                        <div className="main-section5-card-title">3</div>
                        <h4>常駐型開発支援</h4>
                        <p>1ヶ月以内の常駐型開発支援で、現場のコードの教材を作ります。1週間1万行教材化を目安にみてください。</p>
                    </div>
                    <div className="main-section5-card">
                        <div className="main-section5-card-title">4</div>
                        <h4>運用支援</h4>
                        <p>教材ができたら、実際のOJTや引き継ぎでの知識伝承の運用のお手伝いをします。</p>
                    </div>
                </div>
            </div>
            <div className="main-section6">
                OJT・引き継ぎを再現可能にする
                <br />
                OJT・引き継ぎDX「Read」
                <hr />
                まずはご相談ください
                <a href="mailto:coffeecupjapan@yahoo.co.jp" className="big-button" style={{ marginTop: "10px" }}>お問い合わせ</a>
            </div>
            <hr />
            <footer>
                All rights reserved, Copyright (C) スプリングデイズ株式会社
                <br />
                アイコンには以下を使用しています。<a target="_blank" href="https://icons8.com/icon/58855/visualization-skill">視覚化スキル</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
            </footer>
        </>
    )
}

export default LP;