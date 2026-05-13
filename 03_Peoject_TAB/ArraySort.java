public class ArraySort {
    //编写一个方法，接收一个数组，并排序，排序使用冒泡排序算法
    public static void bubbleSort(int[] arr){
        for(int i=0;i<arr.length-1;i++){
            for(int j=0;j<arr.length-1-i;j++){
                if(arr[j]>arr[j+1]){
                    int temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;
                }
            }
        }
    }
    //编写一个方法，接收一个数组，并打印
    public static void printArray(int[] arr){
        for(int i=0;i<arr.length;i++){
            System.out.print(arr[i]+" ");
        }
        System.out.println();
    }
    //编写一个main方法，测试bubbleSort和printArray方法
    public static void main(String[] args){
        int[] arr={3,1,6,2,9,0,7,4,5,8};
        System.out.println("排序前：");
        printArray(arr);
        bubbleSort(arr);
        System.out.println("排序后：");
        printArray(arr);
    }
}
