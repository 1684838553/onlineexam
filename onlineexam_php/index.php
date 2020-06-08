<?php
require_once 'DB.php';
class main {
    public $_return_json = array('status'=>0,'error'=>'ok','data'=>array());
    public $_output = 'json';
    public $subject = array(
        array("name"=>"数学","value"=>"0"),
        array("name"=>"语文","value"=>"1"),
        array("name"=>"C语言","value"=>"2"),
        array("name"=>"C++","value"=>"3"),
        array("name"=>"计算机网络基础","value"=>"4"),
        array("name"=>"大学英语","value"=>"5"),
        array("name"=>"数据结构","value"=>"6"),
    );

    public function view(){
        if($this->_output == 'jsonp'){
            echo 'var res='.json_encode($this->_return_json);
        }else{
            echo json_encode($this->_return_json);
        }
        exit(0);//退出程序
    }
    // 登入接口
    public function checkLogin(){
        $type = $_REQUEST['type'];//teacher or student
        $tbname = $type == 'teacher' ? 'teacher' : 'student';
        $db = new DB($tbname);
        // $db = new DB();
        // $db->setTable($tbname);
        $id = intval($_COOKIE['id']);
        $password = intval($_COOKIE['password']);
        $where = array(
            "id" => $id,
            "password" => $password,
        );
        $rs = $db->get($where);
        if(empty($rs)){
            $this->_return_json['status'] = -1;
            $this->_return_json['error'] = '用户不存在或密码错误';
            $this->view();
        }
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'login successful';
        $this->view();
    }


    // 首页接口
    public function statistical(){
        $getIndexPageJson = file_get_contents('http://localhost:8081/mock/getIndexPage.json');
        $getIndexPageJson = json_decode($getIndexPageJson,1);
        $db = new DB("student");
        $rs = $db->get(array(),"count(*) as cnt");
        $getIndexPageJson['cards'][0]['total'] = intval($rs[0]['cnt']);
        $db->setTable('teacher');
        $rs = $db->get(array(),"count(*) as cnt");
        $getIndexPageJson['cards'][1]['total'] = intval($rs[0]['cnt']);
        $this->_return_json = $getIndexPageJson;
        $this->_return_json['status'] = 0;
        $this->view();
    }
    //信息发布查询接口 
    public function information(){
        $db = new DB("informationRelese");
        $rs=$db->get(array(),'*',0,10,'ctime','desc');
        if(empty($rs)){
            $this->_return_json['status'] = -1;
            $this->_return_json['error'] = 'notice is not exist';
            $this->view();
        }
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'Information has been obtained';
        $this->view();
    }
    // 试卷查询
    public function paper(){
        $db = new DB("paper");
        $rs=$db->get(array(),'*',0,10,'ctime','desc');
        if(empty($rs)){
            $this->_return_json['status'] = -1;
            $this->_return_json['error'] = 'paper is not exist';
            $this->view();
        }
        $this->_return_json['info'] = $rs;
        $this->_return_json['subject'] = $this->subject;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'paper has been obtained';
        $this->view();
    }

    // 试卷通过科目查询
    public function subject(){
        $db = new DB("paper");
        $subjects = $_REQUEST['subjects'];
        // $schools = $_REQUEST['schools'];
        $where = array(
            "subjects" => $subjects,
            // "schools"=>$schools
        );
        $rs = $db->get($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'subject successful';
        $this->view();
    }

    // 通过id查询试卷
    public function paperAndId(){
        $db = new DB("paper");
        $paperId = $_REQUEST['paperId'];
        $where = array(
            "paperId" => $paperId
        );
        $rs = $db->get($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'paperAndId successful';
        $this->view();
    }
    
    // 题库 通过题目类型查询
    public function topic(){
        $db = new DB("questionBank");
        $topic = $_REQUEST['topic'];
        $subjects = $_REQUEST['subjects'];
        $where = array(
            "topic" => $topic,
            "subjects" => $subjects
        );
        $rs = $db->get($where);
        foreach($rs as $k => $v){
            if($v['topic'] <= 1){
                $rs[$k]['questionA'] = $v['questionId']."A";
                $rs[$k]['questionB'] = $v['questionId']."B";
                $rs[$k]['questionC'] = $v['questionId']."C";
                $rs[$k]['questionD'] = $v['questionId']."D";
            }            
        }
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'topic successful';
        $this->view();
    }

    // 试卷管理 通过科目查询题目类型
    public function paperSubjects(){
        $db = new DB("questionBank");
        $subjects = $_REQUEST['subjects'];
        $where = array(
            "subjects" => $subjects
        );
        $rs = $db->get($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'topic successful';
        $this->view();
    }
    // 通过学号查询提交记录试卷
    public function paperList(){
        $db = new DB("record");
        $studentId = $_REQUEST['studentId'];
        $where = array(
            "studentId" => $studentId
        );
        $rs = $db->get($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = '根据学号查询考生试卷成功！';
        $this->view();
    }
    // 通过工号查询提交记录试卷
    public function paperOfTeacher(){
        $db = new DB("record");
        $teacherId = $_REQUEST['teacherId'];
        $where = array(
            "teacherId" => $teacherId
        );
        $rs = $db->get($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = '根据工号查询考生试卷成功！';
        $this->view();
    }
    // 提交记录查询
    public function paperRecord(){
        $db = new DB("record");
        $studentId = $_REQUEST['studentId'];
        $paperId = $_REQUEST['paperId'];
        $where = array(
            "studentId" => $studentId,
            "paperId" => $paperId
        );
        $rs = $db->get($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = '根据学号、试卷号查询提交记录！';
        $this->view();
    }
    // 通过试卷id查询试卷
    public function paperOfId(){
        $db = new DB("paper");
        $paperId = $_REQUEST['paperId'];
        $where = array(
            "paperId" => $paperId
        );
        $rs = $db->get($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = '试卷查询成功！';
        $this->view();
    }
    // 信息发布 通过id删除数据接口
    public function deleteNotice(){
        $db = new DB("informationRelese");
        $id = $_REQUEST['id'];
        $where = array(
            "messageId" => $id
        );
        $rs=$db->delete($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'delete successful';
        $this->view();
    }
    // 试卷管理 通过id删除试卷
    public function deletePaper(){
        $db = new DB("paper");
        $paperId = $_REQUEST['paperId'];
        $where = array(
            "paperId" => $paperId
        );
        $rs=$db->delete($where);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'delete successful';
        $this->view();
    }
    // 信息发布发布信息接口
    public function insertNotice(){
        $db = new DB('informationRelese');
        $content = $_REQUEST['content'];
        $publisher = $_REQUEST['publisher'];
        $ctime = date("Y-m-d H:i:s");
        $set = array(
            "content" => $content,
            "publisher" => $publisher,
            "ctime" =>$ctime
        );
        $rs = $db->add($set);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'insert successful';
        $this->view();
    }
    
    // 答案提交
    public function answerAdd(){
        $db = new DB('record');
        $paperId = $_REQUEST['paperId'];
        $studentId = $_REQUEST['studentId'];
        $teacherId = $_REQUEST['teacherId'];
        $answerOfDanxuan = $_REQUEST['answerOfDanxuan'];
        $answerOfDuoxuan = $_REQUEST['answerOfDuoxuan'];
        $answerOfTiankong = $_REQUEST['answerOfTiankong'];
        $answerOfYingyong = $_REQUEST['answerOfYingyong'];
        $ctime = date("Y-m-d H:i:s");
        $set = array(
            "paperId" => $paperId,
            "studentId" => $studentId,
            "answerOfDanxuan" =>$answerOfDanxuan,
            "answerOfDuoxuan" =>$answerOfDuoxuan,
            "answerOfTiankong" =>$answerOfTiankong,
            "answerOfYingyong" =>$answerOfYingyong,
            "teacherId" =>$teacherId,
            "ctime" =>$ctime
        );
        $rs = $db->add($set);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = '单选题提交成功！';
        $this->view();
    }
    // 用户管理查询接口
    public function management(){
        $type = $_REQUEST['type'];   //teacher or student
        $tbname = $type == 'teacher' ? 'teacher' : 'student';
        $db = new DB($tbname);
        $id = $_REQUEST['id'];
        $where = array(
            "id" => $id
        );
        $rs = $db->get($where);
        if(empty($rs)){
            $this->_return_json['status'] = -1;
            $this->_return_json['error'] = 'user  is not exist';
            $this->view();
        }
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'User information loaded successfully';
        $this->view();
    }

    // 题库管理查询
    public function questionBank(){
        $db = new DB("questionBank");
        $rs=$db->get(array());
        if(empty($rs)){
            $this->_return_json['status'] = -1;
            $this->_return_json['error'] = 'questionBank is not exist';
            $this->view();
        }
        $this->_return_json['info'] = $rs;
        $this->_return_json['subject'] = $this->subject;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'questionBank has been obtained';
        $this->view();
    }

    // 注册
    public function zhuce(){
        $type = $_REQUEST['type'];//teacher or student
        $tbname = $type == 'teacher' ? 'teacher' : 'student';
        $db = new DB($tbname);
        $id = $_REQUEST['id'];
        $name = $_REQUEST['name'];
        $telephone = $_REQUEST['telephone'];
        $password = $_REQUEST['password'];
        $set = array(
            "id" => $id,
            "telephone" => $telephone,
            "password" =>$password,
            "name" =>$name
        );
        $rs = $db->add($set);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'zhuce successful';
        $this->view();
    }
    // 新建题目
    public function questions(){
        $db = new DB('questionBank');
        $subjects = $_REQUEST['subjects'];
        $answer = $_REQUEST['answer'];
        $question = $_REQUEST['question'];
        $optionA = $_REQUEST['optionA'];
        $optionB = $_REQUEST['optionB'];
        $optionC = $_REQUEST['optionC'];
        $optionD = $_REQUEST['optionD'];
        $topic = $_REQUEST['topic'];
        $set = array(
            "subjects" => $subjects,
            "answer" => $answer,
            "question" =>$question,
            "optionA" => $optionA,
            "optionB" => $optionB,
            "optionC" =>$optionC,
            "optionD" => $optionD,
            'topic'=>$topic
        );
        $rs = $db->add($set);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'questions successful';
        $this->view();
    }

    // 新建试卷
    public function papers(){
        $db = new DB('paper');
        $subjects = $_REQUEST['subjects'];
        $paperName = $_REQUEST['paperName'];
        $schools = $_REQUEST['schools'];
        $questionSet = $_REQUEST['questionSet'];
        $peopleDraw = $_REQUEST['peopleDraw'];
        $scoreOne = $_REQUEST['scoreOne'];
        $scoreTwo = $_REQUEST['scoreTwo'];
        $scoreThree = $_REQUEST['scoreThree'];
        $scoreFour = $_REQUEST['scoreFour'];
        $ctime = date("Y-m-d H:i:s");
        $set = array(
            "subjects" => $subjects,
            "paperName" => $paperName,
            "schools" =>$schools,
            "questionSet" => $questionSet,
            "peopleDraw" => $peopleDraw,
            "scoreOne" =>$scoreOne,
            "scoreTwo" => $scoreTwo,
            'scoreFour'=>$scoreFour,
            'scoreThree'=>$scoreThree,
            'ctime'=>$ctime
        );
        $rs = $db->add($set);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'questions successful';
        $this->view();
    }

    // 用户管理修改接口
    public function userupd(){
        $type = $_REQUEST['type'];   //teacher or student
        $tbname = $type == 'teacher' ? 'teacher' : 'student';
        $db = new DB($tbname);
        $id = $_REQUEST['id'];
        $name = $_REQUEST['name'];
        $introduction = $_REQUEST['introduction'];
        $major = $_REQUEST['major'];
        $collage = $_REQUEST['collage'];
        $school = $_REQUEST['school'];
        $educationBackground = $_REQUEST['educationBackground'];
        $gender = $_REQUEST['gender'];
        $nickname = $_REQUEST['nickname'];
        $where = array(
            'id'=>$id
        );
        $set = array(
            'name' =>$name,
            'introduction' =>$introduction,
            'major' =>$major,
            'collage' =>$collage,
            'school' =>$school,
            'educationBackground' =>$educationBackground,
            'gender' =>$gender,
            'nickname' =>$nickname,
        );
        $rs = $db->update($where,$set);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'userupd successful';
        $this->view();
    }
    // 评分
    public function give(){
        $db = new DB('record');
        $studentId = $_REQUEST['studentId'];
        $paperId = $_REQUEST['paperId'];
        $teacherId = $_REQUEST['teacherId'];
        $score = $_REQUEST['score'];
        $where = array(
            'studentId'=>$studentId,
            'paperId'=>$paperId,
            'teacherId'=>$teacherId,
        );
        $set = array(
            'score' =>$score,
        );
        $rs = $db->update($where,$set);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = '成绩提交成功！';
        $this->view();
    }
    //找回密码
    public function change(){
        $type = $_REQUEST['type'];//teacher or student
        $tbname = $type == 'teacher' ? 'teacher' : 'student';
        $db = new DB($tbname);
        $id = $_REQUEST['id'];
        $telephone = $_REQUEST['telephone'];
        $password = $_REQUEST['password'];
        $where = array(
            'id'=>$id,
            'telephone'=>$telephone
        );
        $set =array(
            "password"=>$password
        );
        $rs = $db->update($where,$set);
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = '密码修改成功';
        $this->view();
    }

    // 通过id查询题库中题目
    public function questionBankAndId(){
        $db = new DB("questionBank");
        $questionId = $_REQUEST['questionId'];
        $where = array(
            "questionId" => $questionId
        );
        $rs = $db->get($where);
        foreach($rs as $k => $v){
            if($v['topic'] <= 1){
                $rs[$k]['questionA'] = $v['questionId']."A";
                $rs[$k]['questionB'] = $v['questionId']."B";
                $rs[$k]['questionC'] = $v['questionId']."C";
                $rs[$k]['questionD'] = $v['questionId']."D";
            }            
        }
        $this->_return_json['info'] = $rs;
        $this->_return_json['status'] = 0;
        $this->_return_json['error'] = 'questionBankAndId successful';
        $this->view();
    }

    public function init(){
        $optype = $_REQUEST['optype'];
        $this->_output = $_REQUEST['_output'] ? $_REQUEST['_output'] : 'json';
        switch($optype){
            case 'checkLogin':
                $this->checkLogin();
                break;
            case 'paperOfTeacher':
                $this->paperOfTeacher();
                break;
            case 'give':
                $this->give();
                break;
            case 'paperRecord':
                $this->paperRecord();
                break;
            case 'change':
                $this->change();
                break;
            case 'answerAdd':
                $this->answerAdd();
                break;
            case 'paperOfId':
                $this->paperOfId();
                break;
            case 'paperList':
                $this->paperList();
                break;
            case 'questionBankAndId':
                $this->questionBankAndId();
                break;
            case 'index':
                $this->statistical();
                break;
            case 'deleteNotice':
                $this->deleteNotice();
                break;
            case 'deletePaper':
                $this->deletePaper();
                break;
            case 'information':
                $this->information();
                break;
            case 'management':
                $this->management();
                break; 
            case 'insertNotice':
                $this->insertNotice();
                break;  
            case 'questionBank':
                $this->questionBank();
                break; 
            case 'subject':
                $this->subject();
                break;  
            case 'topic':
                $this->topic();
                break;
            case 'paper':
                $this->paper();
                break;
            case 'zhuce':
                $this->zhuce();
                break;
            case 'userupd':
                $this->userupd();
                break;
            case 'questions':
                $this->questions();
                break;
            case 'paperSubjects':
                $this->paperSubjects();
                break;
            case 'paperAndId':
                $this->paperAndId();
                break;
            case 'papers':
                $this->papers();
                break;
            // case 'student':
            //     $this->student();
            //     break;                        
            default:
                $this->_return_json['status'] = -1;
                $this->_return_json['error'] = 'optype is illegal';
                $this->view();
        }
    }
}
$obj = new main();
$obj->init();

