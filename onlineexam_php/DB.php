<?php 
class DB{
    public $db;
    public $tbname;
    public function __construct($tbname=''){
        if($tbname) $this->tbname = $tbname;
        $this->db =  new Mysqli("39.106.55.231:3306","root","jiangyy020702/",'onlineexam');
        $this->db->query('set names utf8');
    }

    public function setTable($tbname){
        $this->tbname = $tbname;
    }

    public function get($where=array(),$fields='*',$offset=0,$pagesize=10,$orderby='',$ascOrDesc='asc'){
        // $where_str 条件 $fields范围 $offset,$pagesize 分页 orderby 排序
        $where_str = '1';
        foreach($where as $k => $v){
            $v = addslashes($v);
            $where_str .= " and {$k} = '{$v}'";
        } 
        $sql = "select {$fields} from {$this->tbname} where {$where_str}";
        if($orderby){
            $sql .= " order by {$orderby} ${ascOrDesc}";
        }
        $sql .= " limit {$offset},{$pagesize}";
        $resource = $this->db->query($sql);
        // var_dump($sql);
        $rs = $resource->fetch_all(MYSQLI_ASSOC);
        return $rs;
       
    }

    public function delete($where=array()){
        $where_str = '1';
        // addslashes() 函数返回在预定义字符之前添加反斜杠的字符串。
        foreach($where as $k => $v){
            $v = addslashes($v);
            $where_str .= " and {$k} = '{$v}'";
        }
        $sql = "delete from {$this->tbname} where {$where_str}";        
        $resource = $this->db->query($sql);
        return $resource;
    }


    /**
     * 插入语句
     * 参数 array 格式 array('content'=>'xxx','xxx'=>'ddd')
     */
    public function add($set=array()){
        foreach($set as $k => $v){
            $set[$k] = addslashes($v);           
        } 
        $insert_key = array_keys($set);//获取数组的key，返回数组
        $insert_value = array_values($set);
        $sql ="insert into {$this->tbname} (".implode(',',$insert_key).") values ('".implode("','",$insert_value)."')";
        // var_dump($sql);
        $resource = $this->db->query($sql);
        return $resource;
    }

    public function update($where=array(),$set=array()){
        $where_str = '1';
        $set_arr = array();
        foreach($where as $k => $v){
            $v = addslashes($v);
            $where_str .= " and {$k} = '{$v}'";
        }
        foreach($set as $k => $v){
            $v= addslashes($v);
            $set_arr[] = "{$k} = '{$v}'";           
        }
        $sql ="update {$this->tbname} SET ".implode(',',$set_arr)." where {$where_str}";
        // var_dump($sql);
        $resource = $this->db->query($sql);
        return $resource;
    }
}
