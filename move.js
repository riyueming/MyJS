function startMove(obj, json, fnEnd)
{
  var MAX=18;
  //ÿ�ε��þ�ֻ��һ����ʱ���ڹ���(��ʼ�˶�ʱ�ر����ж�ʱ��)
  //���ҹرջ��߿������ǵ�ǰ����Ķ�ʱ�����ѷ�ֹ��ҳ����������ʱ���ĳ�ͻ��ʹÿ����ʱ������������ 
  clearInterval(obj.timer); 
  obj.timer=setInterval(function (){
     
    var bStop=true; // ���裺���е�ֵ���Ѿ�����
     
    for(var name in json)
    {
      var iTarget=json[name]; // Ŀ���
       
      //����͸���ȣ�����ʹ��parseInt�����Ϊ0�� 
       
      if(name=='opacity')
      {
         
        // *100 ������� 0000007 ֮��� ����Ҫ�� Math.round() ����������
        var cur=Math.round(parseFloat(getStyle(obj, name))*100); 
      }
      else
      {
        var cur=parseInt(getStyle(obj, name)); // cur ��ǰ�ƶ�����ֵ
      }
       
      var speed=(iTarget-cur)/5; // �����˶����ٶ� ����ԽС����Խ�� /5 : �Զ��������
       
      speed=speed>0?Math.ceil(speed):Math.floor(speed);
       
      if(Math.abs(speed)>MAX)speed=speed>0?MAX:-MAX;
       
      if(name=='opacity')
      {
        obj.style.filter='alpha(opacity:'+(cur+speed)+')'; //IE
        obj.style.opacity=(cur+speed)/100; //ff chrome
      }
      else
      {
        obj.style[name]=cur+speed+'px';
      }
       
      // ĳ��ֵ������Ŀ��� 
      if(cur!=iTarget)
      {
        bStop=false;
      }
    }
     
    // ���ﵽ��Ŀ���
    if(bStop)
    {
      clearInterval(obj.timer);
       
      if(fnEnd) //ֻ�д������������ȥ����
      {
        fnEnd();
      }
    }
  }, 20);
}