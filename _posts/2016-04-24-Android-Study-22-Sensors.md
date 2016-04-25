---
layout: post
title:  "Android开发手记(22) 传感器的使用"
category: Android-Study
tags:   [Android, Sensor]
---

　　Android的传感器主要包括八大传感器，他们分别是：加速度传感器（accelerometer）、陀螺仪（gyroscope）、方向传感器（orientation）、磁力传感器（magnetic field）、环境光照传感器（light）、温度传感器（temperature）、距离传感器（proximity）和压力传感器（pressure）。本文先对传感器的使用做一个总体的介绍，然后再详细介绍每一种传感器的具体参数获取。

#### **〇、总体介绍**

　　Android传感器的使用，先通过SensorManager获取系统提供的传感器服务。然后通过得到的Sensor服务，实例化一个需要使用到的传感器。之后实例化一个SensorEventListener，来监听传感器的变化信息。最后注册此SensorEventListener即可。

{% highlight java linenos %}
// 获取系统提供的传感器服务
SensorManager sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
// 实例化需要使用的传感器（以加速度传感器为例）
Sensor sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
// 实例化传感器事件监听器
SensorEventListener sel = SensorEventListener() {
        @Override
        public void onSensorChanged(SensorEvent sensorEvent) {
                // 获取传感器变化信息
                // sensorEvent.values 存储了传感器的数值       
        }
 
        @Override
        public void onAccuracyChanged(Sensor sensor, int i) {
                // 获取传感器精度变化信息 
        }
};
// 注册传感器事件监听器，第三个参数为采样时间
sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
{% endhighlight %}

　　传感器的名称和对应类型为：

| 名称 | 英文 | 类型 |
|------------|-------------|--------------|
| 加速度传感器 | accelerometer | Sensor.TYPE_ACCELEROMETER
| 陀螺仪 | gyroscope | Sensor.TYPE_GYROSCOPE
| 方向传感器 | orientation | Sensor.TYPE_ORIENTATION
| 磁场传感器 | magnetic field | Sensor.TYPE_MAGNETIC_FIELD
| 环境光照传感器 | light | Sensor.TYPE_LIGHT
| 温度传感器 | temperature | Sensor.TYPE_AMBIENT_TEMPERATURE
| 距离传感器 | proximity | Sensor.TYPE_PROXIMITY
| 压力传感器 | pressure | ensor.TYPE_PRESSURE


#### **一、加速度传感器（TYPE_ACCELEROMETER）**

　　按照上文所述，我们添加一个Button来启动传感器，然后添加一个TextView来接收传感器的数据。sensorEvent.values存储的数据中，value[0]为X轴方向上的加速度，value[1]为Y轴方向上的加速度，value[2]为Z轴方向上的加速度。单位为m/s2。

{% highlight java linenos %}
btnAcc = (Button) findViewById(R.id.btnAcc);
btnAcc.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        sensorManager.unregisterListener(sel);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        sel = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                float[] value = sensorEvent.values;
                String str = "加速度传感器加速度" + "\nX轴：" + value[0]
                        + "\nY轴：" + value[1] + "\nZ轴：" + value[2];
                textView.setText(str);
            }
 
            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {
 
            }
        };
        sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }
});
{% endhighlight %}

#### **二、陀螺仪（TYPE_GYROSCOPE）**

　　按照上文所述，我们添加一个Button来启动传感器，然后添加一个TextView来接收传感器的数据。sensorEvent.values存储的数据中，value[0]为X轴方向上的角速度，value[1]为Y轴方向上的角速度，value[2]为Z轴方向上的角速度。单位为rad/s。

{% highlight java linenos %}
btnGys = (Button)findViewById(R.id.btnGys);
btnGys.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        sensorManager.unregisterListener(sel);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        sel = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                float[] value = sensorEvent.values;
                String str = "陀螺仪传感器角速度" + "\nX轴：" + value[0]
                        + "\nY轴：" + value[1] + "\nZ轴：" + value[2];
                textView.setText(str);
            }
 
            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {
 
            }
        };
        sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }
});
{% endhighlight %}

#### **三、方向传感器（TYPE_ORIENTATION）**

　　按照上文所述，我们添加一个Button来启动传感器，然后添加一个TextView来接收传感器的数据。sensorEvent.values存储的数据中，value[0]为Yaw轴方向上的角度，value[1]为Pitch轴方向上的角度，value[2]为Roll轴方向上的角度。单位为degree。其中，在手机平面内顺时针旋转为Yaw增加方向，将手机屏幕向上从左往右看，手机逆时针旋转为Pitch增加方向。手机屏幕向上，从后往前看，手机逆时针旋转为Roll增加方向。

{% highlight java linenos %}
btnOri = (Button)findViewById(R.id.btnOri);
btnOri.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        sensorManager.unregisterListener(sel);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION);
        sel = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                float[] value = sensorEvent.values;
                String str = "姿态传感器角度" + "\nYaw：" + value[0]
                        + "\nPitch：" + value[1] + "\nRoll：" + value[2];
                textView.setText(str);
            }
 
            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {
 
            }
        };
        sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }
});
{% endhighlight %}

#### **四、磁场传感器（TYPE_MAGNETIC_FIELD）**

　　按照上文所述，我们添加一个Button来启动传感器，然后添加一个TextView来接收传感器的数据。sensorEvent.values存储的数据中，value[0]为X轴方向上的磁场强度，value[1]为Y轴方向上的磁场强度，value[2]为Z轴方向上的磁场强度。单位为μT。

{% highlight java linenos %}
btnMage = (Button)findViewById(R.id.btnMage);
btnMage.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        sensorManager.unregisterListener(sel);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
        sel = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                float[] value = sensorEvent.values;
                String str = "磁场传感器微特斯拉" + "\nX轴：" + value[0]
                        + "\nY轴：" + value[1] + "\nZ轴：" + value[2];
                textView.setText(str);
            }
 
            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {
 
            }
        };
        sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }
});
{% endhighlight %}

#### **五、环境光照传感器（TYPE_LIGHT）**

　　按照上文所述，我们添加一个Button来启动传感器，然后添加一个TextView来接收传感器的数据。sensorEvent.values存储的数据中，value[0]为当前环境光照强度，单位为lux。

{% highlight java linenos %}
btnLight = (Button)findViewById(R.id.btnLight);
btnLight.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        sensorManager.unregisterListener(sel);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
        sel = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                float[] value = sensorEvent.values;
                String str = "光照传感器" + "\n光强(lux)：" + value[0];
                textView.setText(str);
            }
 
            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {
 
            }
        };
        sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }
});
{% endhighlight %}

#### **六、温度传感器（TYPE_AMBIENT_TEMPERATURE）**

　　按照上文所述，我们添加一个Button来启动传感器，然后添加一个TextView来接收传感器的数据。sensorEvent.values存储的数据中，value[0]为当前环境温度，单位为摄氏度。

{% highlight java linenos %}
btnTemp = (Button)findViewById(R.id.btnTemp);
btnTemp.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        sensorManager.unregisterListener(sel);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_AMBIENT_TEMPERATURE);
        sel = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                float[] value = sensorEvent.values;
                String str = "温度传感器" + "\n温度(℃)：" + value[0];
                textView.setText(str);
            }
 
            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {
 
            }
        };
        sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }
});
{% endhighlight %}

#### **七、距离传感器（TYPE_PROXIMITY）**

　　按照上文所述，我们添加一个Button来启动传感器，然后添加一个TextView来接收传感器的数据。sensorEvent.values存储的数据中，value[0]为当前距离，单位为厘米。距离传感器可以空来探测用户是否在打电话的时候将手机贴到了耳边，从而熄灭屏幕避免误触。

{% highlight java linenos %}
btnPxm = (Button)findViewById(R.id.btnPxm);
btnPxm.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        sensorManager.unregisterListener(sel);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY);
        sel = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                float[] value = sensorEvent.values;
                String str = "距离传感器" + "\n距离(厘米)：" + value[0];
                textView.setText(str);
            }
 
            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {
 
            }
        };
        sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }
});
{% endhighlight %}

#### **八、压力传感器（TYPE_PRESSURE）**

　　按照上文所述，我们添加一个Button来启动传感器，然后添加一个TextView来接收传感器的数据。sensorEvent.values存储的数据中，value[0]为当前压力，压力的返回数值为0~1中间的值，没有具体单位。

{% highlight java linenos %}
btnPre = (Button)findViewById(R.id.btnPre);
btnPre.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        sensorManager.unregisterListener(sel);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY);
        sel = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent sensorEvent) {
                float[] value = sensorEvent.values;
                String str = "压力传感器" + "\n压力：" + value[0];
                textView.setText(str);
            }
 
            @Override
            public void onAccuracyChanged(Sensor sensor, int i) {
 
            }
        };
        sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
    }
});
{% endhighlight %}

#### **九、完整代码：**

{% highlight java linenos %}
import android.app.Activity;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
 
public class MainActivity extends Activity {
 
    private Button btnAcc;
    private Button btnGys;
    private Button btnOri;
    private Button btnMage;
    private Button btnLight;
    private Button btnTemp;
    private Button btnPxm;
    private Button btnPrs;
    private TextView textView;
    private SensorManager sensorManager;
    private SensorEventListener sel;
    private Sensor sensor;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        textView = (TextView) findViewById(R.id.textView);
        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
 
        btnAcc = (Button) findViewById(R.id.btnAcc);
        btnAcc.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sensorManager.unregisterListener(sel);
                sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
                sel = new SensorEventListener() {
                    @Override
                    public void onSensorChanged(SensorEvent sensorEvent) {
                        float[] value = sensorEvent.values;
                        String str = "加速度传感器加速度" + "\nX轴：" + value[0]
                                + "\nY轴：" + value[1] + "\nZ轴：" + value[2];
                        textView.setText(str);
                    }
 
                    @Override
                    public void onAccuracyChanged(Sensor sensor, int i) {
 
                    }
                };
                sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
        });
 
        btnGys = (Button)findViewById(R.id.btnGys);
        btnGys.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sensorManager.unregisterListener(sel);
                sensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
                sel = new SensorEventListener() {
                    @Override
                    public void onSensorChanged(SensorEvent sensorEvent) {
                        float[] value = sensorEvent.values;
                        String str = "陀螺仪传感器角速度" + "\nX轴：" + value[0]
                                + "\nY轴：" + value[1] + "\nZ轴：" + value[2];
                        textView.setText(str);
                    }
 
                    @Override
                    public void onAccuracyChanged(Sensor sensor, int i) {
 
                    }
                };
                sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
        });
 
        btnOri = (Button)findViewById(R.id.btnOri);
        btnOri.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sensorManager.unregisterListener(sel);
                sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ORIENTATION);
                sel = new SensorEventListener() {
                    @Override
                    public void onSensorChanged(SensorEvent sensorEvent) {
                        float[] value = sensorEvent.values;
                        String str = "姿态传感器角度" + "\nYaw：" + value[0]
                                + "\nPitch：" + value[1] + "\nRoll：" + value[2];
                        textView.setText(str);
                    }
 
                    @Override
                    public void onAccuracyChanged(Sensor sensor, int i) {
 
                    }
                };
                sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
        });
 
        btnMage = (Button)findViewById(R.id.btnMage);
        btnMage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sensorManager.unregisterListener(sel);
                sensor = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
                sel = new SensorEventListener() {
                    @Override
                    public void onSensorChanged(SensorEvent sensorEvent) {
                        float[] value = sensorEvent.values;
                        String str = "磁场传感器微特斯拉" + "\nX轴：" + value[0]
                                + "\nY轴：" + value[1] + "\nZ轴：" + value[2];
                        textView.setText(str);
                    }
 
                    @Override
                    public void onAccuracyChanged(Sensor sensor, int i) {
 
                    }
                };
                sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
        });
 
        btnLight = (Button)findViewById(R.id.btnLight);
        btnLight.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sensorManager.unregisterListener(sel);
                sensor = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
                sel = new SensorEventListener() {
                    @Override
                    public void onSensorChanged(SensorEvent sensorEvent) {
                        float[] value = sensorEvent.values;
                        String str = "光照传感器" + "\n光强(lux)：" + value[0];
                        textView.setText(str);
                    }
 
                    @Override
                    public void onAccuracyChanged(Sensor sensor, int i) {
 
                    }
                };
                sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
        });
 
        btnTemp = (Button)findViewById(R.id.btnTemp);
        btnTemp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sensorManager.unregisterListener(sel);
                sensor = sensorManager.getDefaultSensor(Sensor.TYPE_AMBIENT_TEMPERATURE);
                sel = new SensorEventListener() {
                    @Override
                    public void onSensorChanged(SensorEvent sensorEvent) {
                        float[] value = sensorEvent.values;
                        String str = "温度传感器" + "\n温度(℃)：" + value[0];
                        textView.setText(str);
                    }
 
                    @Override
                    public void onAccuracyChanged(Sensor sensor, int i) {
 
                    }
                };
                sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
        });
 
        btnPxm = (Button)findViewById(R.id.btnPxm);
        btnPxm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                sensorManager.unregisterListener(sel);
                sensor = sensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY);
                sel = new SensorEventListener() {
                    @Override
                    public void onSensorChanged(SensorEvent sensorEvent) {
                        float[] value = sensorEvent.values;
                        String str = "距离传感器" + "\n距离(厘米)：" + value[0];
                        textView.setText(str);
                    }
 
                    @Override
                    public void onAccuracyChanged(Sensor sensor, int i) {
 
                    }
                };
                sensorManager.registerListener(sel, sensor, SensorManager.SENSOR_DELAY_NORMAL);
            }
        });
 
    }
 
}
{% endhighlight %}


<div style="text-align: center">
<img src="{{ site.url }}/images/posts/201604/2016042502.png"/> 
</div>

