import { useEffect, useState } from "react";
import type { Info } from "../type/Info";
import { convertOneLeaf, convertTree } from "../util/convertTree";
import { Link } from "react-router-dom";
import type { Leaf, Tree } from "../type/Tree";
import { Box, Button, CircularProgress } from "@mui/material";
import AceEditor from "react-ace";
import { traverseTreeAndGetLeaf, traverseTreeAndGetRoute } from "../util/traverseTree";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "./Explorer.css";

type Props = {
    info: Info;
    originalInput: string;
    resetSettings: () => void;
}

const Explorer: React.FC<Props> = ({
    info,
    originalInput,
    resetSettings
}) => {
    const [searchLeaves, setsearchLeaves] = useState<string[][]>([]);
    const [purpose, setPurpose] = useState<string>("");
    const [inputTree, setInputTree] = useState<Tree>({
        content: convertOneLeaf(null),
        children: []
    });
    const [code, setCode] = useState<string>("");
    const [codeMarker, setCodeMarker] = useState<any[]>([]);
    const [searchLeavesSummary, setSearchLeavesSummary] = useState<string>("");
    const [currentLeaf, setCurrentLeaf] = useState<Leaf>({
        functionName: "",
        functionCodeLine: "",
        originalFilePath: "",
        id: "",
        functionCodeContent: "",
        comment: "",
    });
    const [currentChildren, setCurrentChildren] = useState<Tree[]>([]);
    const [question, setQuestion] = useState<string>("");
    const [questionId, setQuestionId] = useState<string>("");
    const [exploreQueue, setExploreQueue] = useState<Leaf[]>([]);
    const [currentExplorePos, setCurrentExplorePos] = useState(1);

    // functions
    const onChangeFile = async (originalInput2: string) => {
        const file = new Blob([originalInput2], { type: "application/json" });
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            let jsonContent = (e.target?.result || "{}") as string;
            if (!jsonContent) {
                alert("ダウンロードできませんでした...");
                return;
            }
            try {
                const parsedJsonContent = JSON.parse(jsonContent);
                const convertedTreeContent = convertTree(parsedJsonContent);
                const sLeaves = info
                    ?.flatMap((ifi) => ifi.details) ?? [];
                setsearchLeaves(sLeaves);
                setSearchLeavesSummary(
                    info?.[0]?.summary
                    || "サマリーは作成されていません..."
                );
                setPurpose(parsedJsonContent.purpose);
                setInputTree(convertedTreeContent);
                setCurrentChildren(convertedTreeContent.children);
                setCurrentLeaf(convertedTreeContent.content);
                setCode(convertedTreeContent.content.functionCodeContent ?? "コードはありません...");
                setQuestion(sLeaves[0][1]);
                setQuestionId(sLeaves[0][0]);
                const queue = traverseTreeAndGetRoute(convertedTreeContent, sLeaves[0][0], [], []);
                setExploreQueue(queue);
                generateMarker(convertedTreeContent.content.functionCodeContent ?? "コードはありません...", convertedTreeContent.children);
            } catch (e) {
                console.error(e);
                setInputTree(convertTree({}))
            }
        }
        fileReader.readAsText(file)
    }
    const generateMarker = (newCode: string, iChildren: Tree[]) => {
        const newCodeSplit = newCode.split("\n");
        let isOccursArray: number[] = [];
        const childrenMarker = iChildren.map((c, i) => {
            const searchLineExistIndex = newCodeSplit.findIndex((c2) =>
                c2.replace(/\s/, "").includes(c.content.functionName.replace(/\s/, ""))
            );
            if (isOccursArray.includes(searchLineExistIndex)) return null;
            if (searchLineExistIndex === -1) return null;
            isOccursArray.push(searchLineExistIndex);
            return {startRow: searchLineExistIndex, startCol: 0, endRow: searchLineExistIndex, endCol: 100, type: "text", className: `replacement_marker${i+1}`}
        })
        .filter(Boolean);
        console.log(childrenMarker);
        setCodeMarker(childrenMarker);
    }
    const onClickExplore = (id: string) => {
        console.log(exploreQueue);
        const currentQueue = exploreQueue[currentExplorePos].id;
        if (id === currentQueue) {
            alert("正解！");
            if (exploreQueue.length === currentExplorePos + 1){
                alert("経路はここまでです！よくできました！");
                return;
            }
            setCurrentExplorePos((pos) => pos + 1);
            const successChild = currentChildren
                .find((cc) => cc.content.id === id);
            setCode(
                successChild?.content.functionCodeContent?? "コードはありません..."
            );
            setCurrentChildren(successChild?.children ?? []);
            generateMarker(successChild?.content.functionCodeContent?? "コードはありません...", successChild?.children ?? [])
        } else {
            alert("関係ない探索経路です!");
        }
    }
    useEffect(() => {
        if (!originalInput) return;
        onChangeFile(originalInput);
    }, [originalInput]);
    return (
        <Box sx={{
            minWidth: "800px",
        }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid black",
            }}>
                <h3 style={{ margin: "0px 0px 5px" }}>{info[0].json}の教材</h3>
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px"
                    }}
                >
                    <Link to="/teach">
                        <Button
                            color="info"
                            variant="contained"
                            sx={{
                                marginBottom: "10px"
                            }}
                            onClick={resetSettings}
                        >
                            トップに戻る
                        </Button>
                    </Link>
                    <Link to={`/teach/trees/`}>
                        <Button
                            color="success"
                            variant="contained"
                            sx={{
                                marginBottom: "10px"
                            }}
                        >
                            通常モードに移動
                        </Button>
                    </Link>
                </Box>
                {/* <h3 style={{
          margin: "0px 0px 10px",
        }}>
          JSONファイルを１つ入力{"　"}
        </h3>
        <Input
          type="file"
          onChange={onChangeFile}
        /> */}
            </Box>
            <Box sx={{
                backgroundColor: "#AAAAAA40",
                padding: "10px"
            }}>
                <Box sx={{
                    border: "1px solid #CCC",
                    borderRadius: "10px",
                    margin: "10px",
                    padding: "10px 10px 20px",
                    backgroundColor: "white",
                }}>
                    <h3 style={{ margin: 0 }}>現在の問題は <span style={{ color: "blue" }}>{question}</span></h3>
                    <p>目的：{purpose}</p>
                    <hr />
                    <Box sx={{
                        display: "flex",
                        gap: "20px",
                        alignItems: "flex-start"
                    }}>
                        <Box>
                            <p style={{margin: "0 0 5px", fontWeight: "bold"}}>重要な関数探索</p>
                            <Box sx={{
                                display: "grid",
                                gap: "10px",
                                gridTemplateRows: "repeat(3, minmax(0, 1fr))",
                                gridAutoFlow: "column",
                            }}>
                                {searchLeaves.map((sl) => {
                                    return (
                                        <Button
                                            key={`important2_${sl[0]}`}
                                            onClick={() => {
                                                setQuestionId(sl[0]);
                                                setQuestion(sl[1]);
                                                const newLeaf = traverseTreeAndGetLeaf(inputTree, sl[0]);
                                                if (newLeaf) {
                                                    setCurrentLeaf(newLeaf);
                                                    const queue = traverseTreeAndGetRoute(inputTree, sl[0], [], []);
                                                    setExploreQueue(queue);
                                                    setCode(inputTree.content.functionCodeContent ?? "コードはありません...");
                                                    setCurrentExplorePos(1);
                                                    setCurrentChildren(inputTree.children);
                                                    setCurrentLeaf(inputTree.content);
                                                    generateMarker(inputTree.content.functionCodeContent ?? "コードはありません...", inputTree.children)
                                                }
                                            }}
                                            size="small"
                                            variant="contained"
                                            color="info"
                                            disabled={sl[0] === questionId}
                                            style={{
                                                fontSize: "10px"
                                            }}
                                        >
                                            { `${sl[0] === questionId ? "現在選択中　" : ""}` + sl[1]}
                                        </Button>
                                    )
                                })}
                            </Box>
                        </Box>
                        <Box sx={{marginRight: "10px"}}>
                            <p style={{margin: "0 0 5px", fontWeight: "bold"}}>関数探索の木構造</p>
                            <p style={{
                                backgroundColor: "#222222",
                                color: "white",
                                whiteSpace: "break-spaces",
                                padding: "10px",
                                borderRadius: "10px",
                                margin: "0",
                                maxHeight: "200px",
                                minWidth: "300px",
                                maxWidth: "400px",
                                overflow: "scroll"
                            }}>
                                {searchLeavesSummary}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexFlow: "row",
                    gap: "10px",
                    margin: "0 10px",
                    minWidth: "800px",
                    alignItems: "space-between"
                }}>
                    <Box
                        id="left-section"
                        sx={{
                            padding: "10px",
                            flex: "1",
                        }}
                    >
                        <Box sx={{
                            border: "1px solid #CCC",
                            height: "auto",
                            padding: "10px",
                            borderRadius: "10px",
                            backgroundColor: "white",
                        }}>
                            <h3 style={{ margin: "0px 0px 5px" }}>
                                コード
                                <br />
                                <small style={{ fontSize: "12px" }}>
                                    {!!currentLeaf.originalFilePath &&
                                        <>
                                            <a href={"https://github.com/torvalds/linux/tree/v6.17" + currentLeaf.originalFilePath.replace("/Users/kazuyakurihara/Documents/open_source/linux/linux_6_17/linux_6_17", "")}>
                                                {currentLeaf.originalFilePath.replace("/Users/kazuyakurihara/Documents/open_source/linux/linux_6_17/linux_6_17", "")}
                                            </a>
                                            {"　"}
                                            (クリックするとGithubのLinux 6.17の該当ファイルまで飛びます)
                                        </>
                                    }
                                </small>
                            </h3>
                            <hr />
                            <AceEditor
                                mode="c_cpp"
                                theme="github"
                                editorProps={{ $blockScrolling: true }}
                                value={code}
                                markers={codeMarker}
                                style={{
                                    height: "400px",
                                    overflow: "scroll",
                                    minWidth: "100%"
                                }}
                            />
                        </Box>
                    </Box>
                    <Box
                        id="right-section"
                        sx={{
                            padding: "10px",
                            flex: "1",
                        }}
                    >
                        <CircularProgress
                            sx={{
                                display: inputTree.content.functionName !== "" ? "none" : "block",
                            }}
                        />
                        <Box
                            id="choices"
                            sx={{
                                display: inputTree.content.functionName === "" ? "none" : "block",
                                border: "1px solid #CCC",
                                padding: "10px",
                                borderRadius: "10px",
                                backgroundColor: "white",
                                position: "relative"
                            }}
                        >
                            <h3 style={{ margin: "0px 0px 5px" }}>
                                関数の候補
                            </h3>
                            <p style={{ margin: "0px 0px 5px", fontSize: "12px"}}>関数の候補です。左のコードを見て正しいと思うものを選択してください</p>
                            <hr/>
                            {currentChildren.map((cchild, i) => {
                                return (
                                    <Box sx={{marginBottom: "10px"}} key={`important_${cchild.content.id}`}>
                                        <h5
                                            style={{
                                                margin: "0 0 5px",
                                                color: i === 0
                                                ? "red"
                                                : i === 1
                                                ? "blue"
                                                : i === 2
                                                ? "green"
                                                : i === 3
                                                ? "orange"
                                                : "purple"
                                            }}
                                        >
                                            {cchild.content.functionName}
                                        </h5>
                                        <p
                                            style={{
                                                fontSize: "10px",
                                                margin: "0"
                                            }}
                                        >
                                            {cchild.content.comment}
                                        </p>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            sx={{fontSize: "10px"}}
                                            onClick={() => {
                                                onClickExplore(cchild.content.id);
                                            }}
                                        >
                                            選択
                                        </Button>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Explorer;